console.log('[ 🧞 ] 𝐼𝑁𝑺𝑇𝐴𝐿𝐿𝐴𝑇𝐼𝛩𝑁 𝐼𝑁 𝑃𝑅𝛩𝐺𝑅𝐸𝑺𝑺...');
import {join, dirname} from 'path';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';
import {setupMaster, fork} from 'cluster';
import {watchFile, unwatchFile} from 'fs';
import cfonts from 'cfonts';
import {createInterface} from 'readline';
import yargs from 'yargs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {name, author} = require(join(__dirname, './package.json'));
const {say} = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('𝑺𝐻𝐴𝑊𝐴𝑍𝐴 - 𝐵𝛩𝑇', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']});
say(`𝐵𝛩𝑇 𝐶𝑅𝐸𝐷𝐼𝑇 𝐵𝑌 𝑺𝐴𝑌𝐸𝐷 𝑺𝐻𝐴𝑊𝐴𝑍𝐴`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']});

let isRunning = false;
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [join(__dirname, file), ...process.argv.slice(2)];

  /** say('[ ℹ️ ] Escanea el código QR o introduce el código de emparejamiento en WhatsApp.', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']}); **/

  setupMaster({
    exec: args[0],
    args: args.slice(1)});
  const p = fork();
  p.on('message', (data) => {
    
    console.log('[RECIBIDO]', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[ ℹ️ ] 𝐴𝑁 𝑈𝑁𝐸𝑋𝑃𝐸𝐶𝑇𝐸𝐷 𝐸𝑅𝑅𝛩𝑅 𝛩𝐶𝐶𝑈𝑅𝑅𝐸𝐷:', code);

    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);

    if (process.env.pm_id) {
      process.exit(1);
    } else {
      process.exit();
    }
  });
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', (line) => {
        p.emit('message', line.trim());
      });
    }
  }
}
start('main.js');
