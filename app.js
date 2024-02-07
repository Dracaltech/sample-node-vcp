// if not using Babel, you'll want to replace `import` statements with ES5 format, e.g. `const { SerialPort } = require('SerialPort')...`
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

// windows: e.g. path = 'COM3';
const [path, interval, baudRate ] = ['/dev/ttyACM0', 1000, 9600];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// open port
const port = new SerialPort({
  path,
  baudRate,
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// write instructions
port.write(Buffer.from('INFO\r\n'), err => { if (err) console.log('ERROR!', err) });
port.drain(err => { delay(100) });
port.write(Buffer.from(`POLL 1000\r\n`), err => { if (err) console.log('ERROR!', err) });
port.drain(err => { delay(100) });
port.write(Buffer.from('FRAC 2\r\n'), err => { if (err) console.log('ERROR!', err) });
port.drain(err => { delay(100) });

// read event
let info_line, padlen;
parser.on('data', async (data) => {
  const split = data.replace(', ', ',').split(',');

  // example info line:
  // I,Product ID,Serial Number,Message,MS5611 Pressure,Pa,SHT31 Temperature,C,SHT31 Relative Humidity,%,*bbdd

  // extract info line
  if (split[0] === 'I') {
    // parse field titles
    if (split[1] == "Product ID") {
      info_line = split
      padlen = Math.max(...(split.slice(4).map(s => s.length)));
      console.info(info_line.join(','))

    // echo any other info lines
    } else {
      console.info(split[3]);
    }
    return;
  }
  if (!info_line) return console.info('Awaiting info line...');

  // example readout line:
  // D,VCP-PTH450-CAL,E24638,,102466,Pa,24.87,C,66.81,%,*d16d

  // extract readout values
  const device = `${split[1]} ${split[2]}`
  const sensors = info_line.slice(4).filter((v, i) => i % 2 < 1);
  const values = split.slice(4).filter((v, i) => i % 2 < 1).map(parseFloat);
  const units = split.slice(4).filter((v, i) => i % 2 > 0);

  // print result
  console.info(`${new Date().toLocaleString('en-CA')} ${device}`)
  for (const i in units) {  // `units` will have the shorter range (no *abcd value)
    console.info(`${sensors[i].padEnd(padlen + 2)} ${values[i]} ${units[i]}`)
  }
  console.info('\n');

});
