const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/task1/evaluation-results', auth('admin', 'evaluator', 'evaluatee'), taskController.getEvaluationResults);
router.get('/task1/evaluationresults', auth('admin', 'evaluator', 'evaluatee'), taskController.getEvaluationResults);
router.patch('/task2/results/:id/submit', auth('admin', 'evaluator'), taskController.submitResult);
router.get('/task3/reports/normalized', auth('admin', 'evaluator', 'evaluatee'), taskController.getNormalizedReport);
router.post('/task4/assignments', auth('admin'), taskController.createAssignmentWithUniqueGuard);
router.get('/task5/reports/progress', auth('admin', 'evaluator'), taskController.getProgressByDepartment);

module.exports = router;
