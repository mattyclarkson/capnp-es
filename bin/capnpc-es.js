import main, {Options, OptionsError} from '../lib/main.js';
import Logger from '../lib/Logger.js';
import {WARN, INFO} from '../lib/logger/level.js';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), {encoding: 'utf8'}));

process.title = pkg.name;

function version(status=0) {
  process.stdout.write(`${pkg.version}\n`);
  process.exit(status);
}

function help(status=0) {
  process.stdout.write(`Usage: ${process.title} [options]
Options:
  --help                   Display this information.
  --version                Output the script version.
  --verbose                Increase logging output.
`);
  process.exit(status);
}

try {
  const args = {};

  const unparsed = process.argv.slice(2).filter(arg => {
    switch (arg) {
    case '--verbose': args.verbose = true; return false;
    case '--help': help(); return false;
    case '--version': version(); return false;
    default: return true;
    }
  });

  if (unparsed.length) {
    throw new OptionsError(`Unknown arguments: ${unparsed.join(', ')}`);
  }

  const logger = new Logger({level: args.verbose ? INFO : WARN});

  const options = new Options({logger});

  const status = main(options);

  process.exit(status);
} catch (e) {
  if (e instanceof OptionsError) {
    process.stderr.write(`${e.message}\n`);
    process.exit(2);
  } else {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  }
}
