// if not using Babel, you'll want to replace `import` statements with ES5 format, e.g. `const { SerialPort } = require('SerialPort')...`
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const port = new SerialPort({
  // windows: e.g. 'COM3';
  path: '/dev/ttyACM0',
  baudRate: 9600 ,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// read event
parser.on('data', function(data) {
  // handle any of the ports being unable to report data
  data = data.replace('ERROR', '-1');

  // print result
  console.log(data);
});
