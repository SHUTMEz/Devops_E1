# Security & Bug Fix Report

## 1) IDOR Guard
- Added role-aware authorization on `GET /api/task1/evaluation-results` (+ alias `evaluationresults`).
- Admin can view all assignments, evaluator only own assignments, evaluatee only own assignments.
- Unauthorized access returns `403 { error: 'forbidden' }`.

## 2) Evidence Submit Rule (Result-scoped)
- Added rule for `PATCH /api/task2/results/:id/submit`.
- If `indicator.type='yes_no'` and `value_yes_no=1` but no attachment with same `result_id`, API returns `400 EVIDENCE_REQUIRED`.
- Locked results cannot be re-submitted (`409 RESULT_LOCKED`).

## 3) Unique Assignment
- Added duplicate check on `POST /api/task4/assignments`.
- Duplicate `(evaluator_id, evaluatee_id, period_id)` returns `409 DUPLICATE_ASSIGNMENT`.

## 4) Upload Hardening
- Upload size limit = 10MB (`413 PAYLOAD_TOO_LARGE`).
- File extension + MIME allowlist for evidence uploads (`415 UNSUPPORTED_MEDIA_TYPE`).

## 5) Security Headers
- Added baseline response security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: no-referrer`

## 6) Operational endpoints
- Added `/system/health` and refreshed `openapi.json` contract.
