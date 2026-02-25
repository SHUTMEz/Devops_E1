# LB + Scale Report (Short)

## Config files
- `docker-compose.lb.yml`
- `nginx.lb.conf`
- `loadtest/k6-normalized.js`

## Run steps
1. `docker compose -f docker-compose.lb.yml up -d --build`
2. `curl http://localhost:8080/system/health`
3. `k6 run loadtest/k6-normalized.js`

## Expected
- Nginx reverse-proxy routes `/api/*` to 2 API instances (`api1`, `api2`)
- Health endpoint reachable via load balancer
- k6 threshold p95 < 500ms

## Notes
- If p95 >= 500ms, tune DB index, increase API replicas, and enable keepalive in Nginx upstream.
