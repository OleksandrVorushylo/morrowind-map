import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import console from 'node:console';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const windows = process.platform === 'win32';
const environment = { ...process.env, MORROWIND_ANDROID_BUILD: '1' };
const localJdk = join(root, 'local-data', 'android-tools', 'jdk');
const localSdk = join(root, 'local-data', 'android-tools', 'sdk');
if (!environment.JAVA_HOME && existsSync(join(localJdk, 'bin', windows ? 'java.exe' : 'java'))) {
  environment.JAVA_HOME = localJdk;
}
if (!environment.ANDROID_HOME && existsSync(localSdk)) {
  environment.ANDROID_HOME = localSdk;
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, env: environment, stdio: 'inherit' });
  if (result.error) {
    console.error(`Could not start ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function runPnpm(args) {
  if (windows) {
    run(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `pnpm.cmd ${args.join(' ')}`]);
  } else {
    run('pnpm', args);
  }
}

const syncOnly = process.argv.slice(2).includes('--sync');
if (!syncOnly) run(process.execPath, ['tools/python.mjs', '-m', 'tools.android.verify_data']);
runPnpm(['build']);
runPnpm(['exec', 'cap', 'sync', 'android']);
if (!syncOnly) {
  if (windows) {
    run(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'android\\gradlew.bat -p android --no-daemon --max-workers=2 assembleDebug']);
  } else {
    run('./android/gradlew', ['-p', 'android', '--no-daemon', '--max-workers=2', 'assembleDebug']);
  }
  run(process.execPath, ['tools/python.mjs', '-m', 'tools.android.verify_apk']);
}
