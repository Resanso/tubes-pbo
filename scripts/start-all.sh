#!/usr/bin/env bash
# start-all.sh — Start backend + frontend in parallel for local development
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
LOG_DIR="$ROOT_DIR/logs"

mkdir -p "$LOG_DIR"

# ── Validate required env vars ─────────────────────────────────────────────────
required_vars=("DATABASE_URL" "DATABASE_USERNAME" "DATABASE_PASSWORD")
missing=()
for var in "${required_vars[@]}"; do
  [[ -z "${!var}" ]] && missing+=("$var")
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "ERROR: The following environment variables are not set:"
  for v in "${missing[@]}"; do echo "  - $v"; done
  echo ""
  echo "Copy .env.example to .env and source it before running this script:"
  echo "  cp .env.example .env && source .env"
  exit 1
fi

echo "============================================"
echo " Mending Beli atau Nabung? — Dev Launcher  "
echo "============================================"

# ── Backend (Spring Boot via Maven wrapper or system mvn) ──────────────────────
echo "[1/2] Starting Spring Boot backend on :8083 ..."
cd "$BACKEND_DIR"
MVN_CMD="./mvnw"
[[ ! -f "./mvnw" ]] && MVN_CMD="mvn"
$MVN_CMD spring-boot:run \
  -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev" \
  > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo "      PID: $BACKEND_PID  →  tail -f logs/backend.log"

# ── Frontend (Vite dev server) ─────────────────────────────────────────────────
echo "[2/2] Starting Vite frontend on :5173 ..."
cd "$FRONTEND_DIR"

# Install dependencies if node_modules is missing
if [[ ! -d "node_modules" ]]; then
  echo "      node_modules not found — running npm install ..."
  npm install
fi

npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "      PID: $FRONTEND_PID  →  tail -f logs/frontend.log"

# ── Save PIDs so stop-all.sh can kill them ─────────────────────────────────────
echo "$BACKEND_PID"  > "$LOG_DIR/backend.pid"
echo "$FRONTEND_PID" > "$LOG_DIR/frontend.pid"

echo ""
echo "Both services started. Access the app at:"
echo "  Frontend  →  http://localhost:5173"
echo "  Backend   →  http://localhost:8083/api"
echo ""
echo "Run './scripts/stop-all.sh' to stop both services."
