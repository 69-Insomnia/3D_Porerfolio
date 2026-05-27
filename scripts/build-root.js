const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const clientRoot = path.join(projectRoot, 'client');
const clientNext = path.join(clientRoot, '.next');
const rootNext = path.join(projectRoot, '.next');

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit', shell: true, ...options });

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function copyDir(src, dest) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
}

async function main() {
  try {
    await runCommand('npm', ['--workspace', 'client', 'run', 'build'], { cwd: projectRoot });
    if (!fs.existsSync(clientNext)) {
      throw new Error('Client .next folder not found after build');
    }
    copyDir(clientNext, rootNext);
    console.log('Copied client/.next to root .next');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
