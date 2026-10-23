#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ $(uname -s) != Darwin ]]; then
  echo "Showtime requires macOS and Safari." >&2
  exit 1
fi

# Check displays before starting a server or opening windows.
osascript -l JavaScript scripts/showtime.js --check

if lsof -tiTCP:3030 -sTCP:LISTEN >/dev/null; then
  echo "Port 3030 is already in use. Stop the existing server and try again." >&2
  exit 1
fi

server_pid=
cleanup() {
  if [[ -n "$server_pid" ]]; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

./node_modules/.bin/slidev --port 3030 &
server_pid=$!

ready=false
for ((attempt = 0; attempt < 120; attempt++)); do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "Slidev exited before it was ready." >&2
    exit 1
  fi
  if curl --fail --silent --max-time 1 http://localhost:3030/ >/dev/null; then
    ready=true
    break
  fi
  sleep 0.5
done
if [[ "$ready" != true ]]; then
  echo "Slidev did not become ready in time." >&2
  exit 1
fi

# Apple's supported command-line route to Focus is a user-created Shortcut.
if shortcuts list | grep -Fx 'Showtime DND' >/dev/null; then
  if ! shortcuts run 'Showtime DND'; then
    echo "Warning: the Showtime DND shortcut failed; enable DND manually." >&2
  fi
else
  echo 'DND skipped: create a "Showtime DND" shortcut to enable it automatically.'
fi

if osascript -l JavaScript scripts/showtime.js; then
  echo "Showtime is ready. Keep this terminal open; Ctrl+C stops Slidev."
else
  echo "Window setup failed. Slidev is still running at http://localhost:3030/." >&2
  echo "Check the error above, or arrange Safari manually. Ctrl+C stops Slidev." >&2
fi
wait "$server_pid"
