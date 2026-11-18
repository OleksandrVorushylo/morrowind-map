#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
if [[ -z "${JAVA_HOME:-}" && -x "$PWD/local-data/android-tools/jdk/bin/java" ]]; then
  export JAVA_HOME="$PWD/local-data/android-tools/jdk"
fi
if [[ -z "${ANDROID_HOME:-}" && -d "$PWD/local-data/android-tools/sdk" ]]; then
  export ANDROID_HOME="$PWD/local-data/android-tools/sdk"
fi
python3 -m tools.android.verify_data
MORROWIND_ANDROID_BUILD=1 pnpm build
pnpm exec cap sync android
./android/gradlew -p android --no-daemon --max-workers=2 assembleDebug
python3 -m tools.android.verify_apk
