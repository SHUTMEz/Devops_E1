# Integration Test Strategy/Plan

## Entry Criteria
- Database schema created and seed data loaded
- Backend started successfully
- Valid JWT for Admin/Evaluator/Evaluatee available

## Exit Criteria
- Functional TC pass rate >= 95%
- Security TC (IDOR + Evidence Rule + Duplicate assignment) pass 100%
- No critical severity defects remain open

## Test Cases
1. POST `/api/auth/register` and `/api/auth/login`
2. GET `/api/task1/evaluation-results` (allowed and forbidden)
3. PATCH `/api/task2/results/:id/submit` with/without evidence
4. POST `/api/task4/assignments` duplicate guard
5. GET `/api/task3/reports/normalized?period_id=...`
6. GET `/api/task5/reports/progress?period_id=...`

## Severity
- Critical: security bypass, data leakage
- High: wrong score normalization, wrong role access
- Medium: incorrect status transition
- Low: minor response format issues
