import fs from 'fs';
import zlib from 'zlib';

function readChunk(data, offset) {
  const length = data.readUInt32BE(offset);
  const type = data.toString('ascii', offset + 4, offset + 8);
  const chunkData = data.slice(offset + 8, offset + 8 + length);
  const crc = data.readUInt32BE(offset + 8 + length);
  return { length, type, chunkData, crc, totalSize: 12 + length };
}

const data = fs.readFileSync('public/icon-144x144.png');
console.log('Total file size:', data.length);

let offset = 8; // Skip PNG signature
const chunks = [];
while (offset < data.length) {
  const chunk = readChunk(data, offset);
  chunks.push(chunk);
  console.log(`Chunk: ${chunk.type}, length: ${chunk.length}`);
  if (chunk.type === 'IHDR') {
    const width = chunk.chunkData.readUInt32BE(0);
    const height = chunk.chunkData.readUInt32BE(4);
    console.log(`  Dimensions: ${width}x${height}`);
  }
  if (chunk.type === 'IEND') break;
  offset += chunk.totalSize;
}

// Validate CRC for each chunk
function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xEDB88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

let valid = true;
offset = 8;
while (offset < data.length) {
  const length = data.readUInt32BE(offset);
  const type = data.toString('ascii', offset + 4, offset + 8);
  const chunkData = data.slice(offset + 8, offset + 8 + length);
  const storedCrc = data.readUInt32BE(offset + 8 + length);
  const chunkWithType = Buffer.concat([Buffer.from(type, 'ascii'), chunkData]);
  const calculatedCrc = crc32(chunkWithType);
  
  if (storedCrc !== calculatedCrc) {
    console.log(`CRC mismatch for ${type}: stored=${storedCrc}, calculated=${calculatedCrc}`);
    valid = false;
  }
  
  if (type === 'IEND') break;
  offset += 12 + length;
}

console.log('PNG valid:', valid);