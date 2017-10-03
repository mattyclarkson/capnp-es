import generate from '../lib/generate.js';
import Logger from '../lib/Logger.js';
import {WARN, INFO} from '../lib/logger/level.js';
import fs from 'fs';
import path from 'path';

class OptionsError extends Error {}

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

function stdin() {
  const {stdin} = process;
  stdin.resume();
  const chunks = [];
  return new Promise((resolve, reject) => {
    stdin.on('data', chunk => chunks.push(chunk));
    stdin.on('end', () => resolve(Buffer.concat(chunks, chunks.reduce((s, c) => s += c.length, 0)).buffer));
    stdin.on('error', reject);
  });
}

stdin()
  .then(buffer => {
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

    const ast = generate(buffer, logger);

    logger.debug(ast);

    process.exit(0);
  })
  .catch(err => {
    if (err instanceof OptionsError) {
      process.stderr.write(`${err.message}\n`);
      process.exit(2);
    } else {
      process.stderr.write(`${err}\n`);
      process.exit(1);
    }
  });


