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

class Console {
  constructor() {
    Object.defineProperties(this, {
      stream: {value: process.stderr},
      colours: {value: {
        red: '\x1b[31m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
        black: '\x1b[30m',
        reset: '\x1b[0m'
      }}
    });
  }

  debug(...args) {
    this.stream.write(`${this.colours.blue}${args.join(' ')}${this.colours.reset}\n`);
  }

  info(...args) {
    this.stream.write(`${this.colours.green}${args.join(' ')}${this.colours.reset}\n`);
  }

  warn(...args) {
    this.stream.write(`${this.colours.yellow}${args.join(' ')}${this.colours.reset}\n`);
  }

  error(...args) {
    this.stream.write(`${this.colours.red}${args.join(' ')}${this.colours.reset}\n`);
  }
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

  const logger = new Logger({level: args.verbose ? INFO : WARN, console: new Console()});

  const options = new Options({logger});

  main(options);

  process.exit(0);
} catch (e) {
  if (e instanceof OptionsError) {
    process.stderr.write(`${e.message}\n`);
    process.exit(2);
  } else {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  }
}
