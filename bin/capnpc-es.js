import main, {Options, OptionsError} from '../lib/main.js';

try {
  const options = new Options();
  const status = main(options);
  process.exit(status);
} catch (e) {
  if (e instanceof OptionsError) {
    process.stderr.write(`${e}\n`);
    process.exit(2);
  } else {
    process.stderr.write(`${e}\n`);
    process.exit(1);
  }
}
