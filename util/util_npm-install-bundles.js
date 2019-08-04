// shamelessly stolen from SO
// https://stackoverflow.com/questions/31773546/the-best-way-to-run-npm-install-for-nested-folders

const fs = require('fs');
const { resolve, join } = require('path');
const cp = require('child_process');

// get library path
const bundlesPath = resolve(__dirname, '../bundles/');

fs.readdirSync(bundlesPath)
  .forEach((mod) => {
    const bundlePath = join(bundlesPath, mod);
    // ensure path has package.json
    if (!fs.existsSync(join(bundlePath, 'package.json'))) {
      return;
    }

    // Determine OS and set command accordingly
    const cmd = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

    // install folder
    cp.spawn(cmd, ['i'], { env: process.env, cwd: bundlePath, stdio: 'inherit' });
  });
