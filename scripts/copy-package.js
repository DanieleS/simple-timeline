const packageJson = require("../package.json");
const fs = require("fs");
const path = require("path");

delete packageJson.devDependencies;
delete packageJson.scripts;

packageJson.main = 'commonjs/index.js';
packageJson.types = 'types/index.d.ts';

fs.writeFileSync(path.join(__dirname, "../dist/package.json"), JSON.stringify(packageJson, " ", 4))
fs.createReadStream('./README.md').pipe(fs.createWriteStream('./dist/README.md'));
fs.createReadStream('./LICENSE').pipe(fs.createWriteStream('./dist/LICENSE'));
