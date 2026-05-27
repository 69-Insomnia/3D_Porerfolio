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

    const clientPublic = path.join(clientRoot, 'public');
    const rootPublic = path.join(projectRoot, 'public');

    copyDir(clientNext, rootNext);
    console.log('Copied client/.next to root .next');

    if (fs.existsSync(clientPublic)) {
      copyDir(clientPublic, rootPublic);
      console.log('Copied client/public to root public');
    } else {
      console.warn('Warning: client/public folder not found. Images may not be served correctly.');
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
