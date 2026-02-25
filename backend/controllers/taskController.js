const db = require('../db/knex');

const hasAssignmentAccess = async ({ role, userId, assignmentId }) => {
  if (role === 'admin') return true;

  const assignment = await db('assignments').where({ id: assignmentId }).first();
  if (!assignment) return false;

  if (role === 'evaluator') return Number(assignment.evaluator_id) === Number(userId);
  if (role === 'evaluatee') return Number(assignment.evaluatee_id) === Number(userId);
  return false;
};

exports.getEvaluationResults = async (req, res) => {
  try {
    const { assignment_id, user_id } = req.query;
    const assignmentId = Number(assignment_id);

    if (!assignmentId) {
      return res.status(400).json({ error: 'assignment_id is required' });
    }

    const assignment = await db('assignments').where({ id: assignmentId }).first();
    if (!assignment) return res.status(404).json({ error: 'ASSIGNMENT_NOT_FOUND' });

    const allowed = await hasAssignmentAccess({
      role: req.user.role,
      userId: req.user.id,
      assignmentId,
    });

    if (!allowed) {
      return res.status(403).json({ error: 'forbidden' });
    }

    const targetUserId = user_id ? Number(user_id) : Number(assignment.evaluatee_id);

    if (req.user.role !== 'admin' && targetUserId !== Number(assignment.evaluatee_id)) {
      return res.status(403).json({ error: 'forbidden' });
    }

    const rows = await db('evaluation_results as r')
      .join('indicators as i', 'i.id', 'r.indicator_id')
      .select(
        'r.id',
        'r.period_id',
        'r.evaluatee_id',
        'r.evaluator_id',
        'r.topic_id',
        'r.indicator_id',
        'r.score',
        'r.value_yes_no',
        'r.notes',
        'r.status',
        'r.submitted_at',
        'r.updated_at',
        'i.type as indicator_type'
      )
      .where({
        'r.period_id': assignment.period_id,
        'r.evaluatee_id': assignment.evaluatee_id,
        'r.evaluator_id': assignment.evaluator_id,
      });

    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.submitResult = async (req, res) => {
  try {
    const resultId = Number(req.params.id);
    const result = await db('evaluation_results as r')
      .join('indicators as i', 'i.id', 'r.indicator_id')
      .select('r.*', 'i.type as indicator_type')
      .where('r.id', resultId)
      .first();

    if (!result) return res.status(404).json({ error: 'RESULT_NOT_FOUND' });
    if (result.status === 'locked') return res.status(409).json({ error: 'RESULT_LOCKED' });

    if (req.user.role !== 'admin' && Number(req.user.id) !== Number(result.evaluator_id)) {
      return res.status(403).json({ error: 'forbidden' });
    }

    if (result.indicator_type === 'yes_no' && Number(result.value_yes_no) === 1) {
      const attachment = await db('attachments')
        .where({ result_id: resultId })
        .first();

      if (!attachment) {
        return res.status(400).json({ error: 'EVIDENCE_REQUIRED' });
      }
    }

    await db('evaluation_results')
      .where({ id: resultId })
      .update({ status: 'submitted', submitted_at: db.fn.now(), updated_at: db.fn.now() });

    const updated = await db('evaluation_results').where({ id: resultId }).first();
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getNormalizedReport = async (req, res) => {
  try {
    const periodId = Number(req.query.period_id);
    if (!periodId) return res.status(400).json({ error: 'period_id is required' });

    const rows = await db('evaluation_results as r')
      .join('indicators as i', 'i.id', 'r.indicator_id')
      .join('evaluation_topics as t', 't.id', 'r.topic_id')
      .select(
        'r.evaluatee_id',
        'r.topic_id',
        't.code as topic_code',
        'i.type',
        'i.weight as indicator_weight',
        't.weight as topic_weight',
        'r.score',
        'r.value_yes_no'
      )
      .where('r.period_id', periodId)
      .whereIn('r.status', ['submitted', 'locked']);

    const map = new Map();
    for (const row of rows) {
      const key = `${row.evaluatee_id}-${row.topic_id}`;
      if (!map.has(key)) {
        map.set(key, {
          evaluatee_id: row.evaluatee_id,
          topic_id: row.topic_id,
          topic_code: row.topic_code,
          topic_weight: Number(row.topic_weight),
          weightedSum: 0,
          sumWeight: 0,
        });
      }
      const entry = map.get(key);
      const indWeight = Number(row.indicator_weight || 1);
      let normalized = 0;
      if (row.type === 'score_1_4' && row.score !== null) {
        normalized = (Number(row.score) - 1) / 3;
      } else if (row.type === 'yes_no') {
        normalized = Number(row.value_yes_no || 0) ? 1 : 0;
      }
      entry.weightedSum += normalized * indWeight;
      entry.sumWeight += indWeight;
    }

    const perTopic = [];
    const totalMap = new Map();
    for (const item of map.values()) {
      const topicScore = item.sumWeight ? (item.weightedSum / item.sumWeight) * item.topic_weight : 0;
      perTopic.push({
        evaluatee_id: item.evaluatee_id,
        topic_id: item.topic_id,
        topic_code: item.topic_code,
        topic_score: Number(topicScore.toFixed(2)),
      });
      totalMap.set(item.evaluatee_id, (totalMap.get(item.evaluatee_id) || 0) + topicScore);
    }

    const totals = Array.from(totalMap.entries()).map(([evaluatee_id, total]) => ({
      evaluatee_id,
      total_60: Number(total.toFixed(2)),
    }));

    return res.status(200).json({ per_topic: perTopic, totals });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createAssignmentWithUniqueGuard = async (req, res) => {
  try {
    const { evaluator_id, evaluatee_id, period_id, dept_id } = req.body;
    if (!evaluator_id || !evaluatee_id || !period_id) {
      return res.status(400).json({ error: 'evaluator_id, evaluatee_id, period_id are required' });
    }

    const exists = await db('assignments')
      .where({ evaluator_id, evaluatee_id, period_id })
      .first();

    if (exists) {
      return res.status(409).json({ error: 'DUPLICATE_ASSIGNMENT' });
    }

    const [id] = await db('assignments').insert({ evaluator_id, evaluatee_id, period_id, dept_id: dept_id || null });
    const row = await db('assignments').where({ id }).first();

    return res.status(201).json(row);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProgressByDepartment = async (req, res) => {
  try {
    const periodId = Number(req.query.period_id);
    if (!periodId) return res.status(400).json({ error: 'period_id is required' });

    const rows = await db('assignments as a')
      .leftJoin('departments as d', 'd.id', 'a.dept_id')
      .leftJoin('evaluation_results as r', function joinResults() {
        this.on('r.period_id', '=', 'a.period_id')
          .andOn('r.evaluatee_id', '=', 'a.evaluatee_id')
          .andOn('r.evaluator_id', '=', 'a.evaluator_id')
          .andOn(db.raw("r.status in ('submitted','locked')"));
      })
      .where('a.period_id', periodId)
      .groupBy('a.dept_id', 'd.name_th')
      .select('d.name_th as department')
      .select(db.raw('COUNT(DISTINCT a.id) as total'))
      .select(db.raw('COUNT(DISTINCT CASE WHEN r.id IS NOT NULL THEN a.id END) as submitted'));

    const data = rows.map((r) => {
      const total = Number(r.total || 0);
      const submitted = Number(r.submitted || 0);
      const percent = total === 0 ? 0 : Number(((submitted / total) * 100).toFixed(2));
      return {
        department: r.department || 'N/A',
        submitted,
        total,
        percent,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
