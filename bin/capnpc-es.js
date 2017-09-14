import main, {Options, OptionsError} from '../lib/main.js';
import Logger from '../lib/Logger.js';
import {WARN, INFO} from '../lib/logger/level.js';
import cla from 'command-line-args';

try {
  const args = cla([
    {name: 'verbose', alias: 'v', type: Boolean}
  ]);

  const logger = new Logger({level: args.verbose ? INFO : WARN});

  const options = new Options({logger});

  const status = main(options);

  process.exit(status);
} catch (e) {
  if (e.name === 'UNKNOWN_OPTION') {
    process.stderr.write(`${e.message}\n`);
    process.exit(2);
  } else if (e instanceof OptionsError) {
    process.stderr.write(`${e.message}\n`);
    process.exit(2);
  } else {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  }
}
