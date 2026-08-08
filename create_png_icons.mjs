import fs from 'fs';
import zlib from 'zlib';

// Target95 brand color: #3b82f6 (blue)
// Create a simple solid-color PNG icon

function createPNG(width, height, r, g, b, outputPath) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);  // width
  ihdrData.writeUInt32BE(height, 4); // height
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // color type: RGB
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  
  const ihdrChunk = createChunk('IHDR', ihdrData);
  
  // IDAT chunk - image data
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter: None
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b);
    }
  }
  const rawBuffer = Buffer.from(rawData);
  const compressedData = zlib.deflateSync(rawBuffer);
  const idatChunk = createChunk('IDAT', compressedData);
  
  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, png);
  console.log(`Created ${outputPath} (${png.length} bytes)`);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, 'ascii');
  const chunkData = Buffer.concat([typeBuffer, data]);
  
  // CRC
  const crc = crc32(chunkData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);
  
  return Buffer.concat([length, chunkData, crcBuffer]);
}

// CRC32 implementation
function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = makeCRCTable();
  
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
  }
  
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeCRCTable() {
  const table = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xEDB88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }
  return table;
}

// Target95 brand color: #3b82f6
const r = 0x3b;
const g = 0x82;
const b = 0xf6;

const sizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512];
sizes.forEach(size => {
  createPNG(size, size, r, g, b, `public/icon-${size}x${size}.png`);
});

console.log('All icons generated successfully!');