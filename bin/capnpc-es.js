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
  process.stdout.write(`Usage: ${process.title} [<option>...]

This is a Cap'n Proto compiler plugin which generates ECMAscript modules. It
is meant to be run using the Cap'n Proto compiler, e.g.:
    capnp compile -oes foo.capnp

Options:
    --verbose
        Log informational messages to stderr; useful for debugging.
    --version
        Print version information and exit.
    --help
        Display this help text and exit.
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
