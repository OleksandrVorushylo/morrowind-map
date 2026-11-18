import { spawnSync } from 'node:child_process';
import console from 'node:console';
import process from 'node:process';

const python = process.env.MORROWIND_PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(python, process.argv.slice(2), { stdio: 'inherit' });

if (result.error) {
  console.error(`Could not start Python (${python}): ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
