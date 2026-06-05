#!/usr/bin/env bash
# stop-all.sh — Gracefully stop all local dev processes
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/logs"

stop_pid() {
  local name="$1"
  local pidfile="$LOG_DIR/${name}.pid"

  if [[ -f "$pidfile" ]]; then
    local pid
    pid=$(cat "$pidfile")
    if kill -0 "$pid" 2>/dev/null; then
      echo "Stopping $name (PID $pid) ..."
      kill "$pid"
      rm -f "$pidfile"
    else
      echo "$name is not running (stale PID file removed)."
      rm -f "$pidfile"
    fi
  else
    echo "$name PID file not found — may not be running."
  fi
}

echo "============================================"
echo " Stopping all dev services...              "
echo "============================================"

stop_pid "backend"
stop_pid "frontend"

echo ""
echo "All services stopped."
