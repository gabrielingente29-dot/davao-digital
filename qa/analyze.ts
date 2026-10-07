/**
 * Minimal PNG analyzer for QA screenshots (no dependencies).
 * Reports per-band luminance stats so blank/broken sections stand out,
 * plus the share of brand-violet pixels as a sanity check.
 *
 * Usage: bun qa/analyze.ts qa/full-desktop.png [bandHeight]
 */
const path = process.argv[2];
const bandH = Number(process.argv[3] ?? 900);
if (!path) {
  console.error("usage: bun qa/analyze.ts <file.png> [bandHeight]");
  process.exit(1);
}

const buf = new Uint8Array(await Bun.file(path).arrayBuffer());
const dv = new DataView(buf.buffer);

let pos = 8;
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;
const idat: Uint8Array[] = [];

while (pos < buf.length) {
  const len = dv.getUint32(pos);
  const type = String.fromCharCode(buf[pos + 4], buf[pos + 5], buf[pos + 6], buf[pos + 7]);
  const dataStart = pos + 8;
  if (type === "IHDR") {
    width = dv.getUint32(dataStart);
    height = dv.getUint32(dataStart + 4);
    bitDepth = buf[dataStart + 8];
    colorType = buf[dataStart + 9];
  } else if (type === "IDAT") {
    idat.push(buf.subarray(dataStart, dataStart + len));
  } else if (type === "IEND") {
    break;
  }
  pos = dataStart + len + 4;
}

if (bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) {
  console.error(`unsupported png: bitDepth=${bitDepth} colorType=${colorType}`);
  process.exit(1);
}

const channels = colorType === 6 ? 4 : 3;
const stride = width * channels;
const raw = new Uint8Array(idat.reduce((n, c) => n + c.length, 0));
{
  let off = 0;
  for (const c of idat) {
    raw.set(c, off);
    off += c.length;
  }
}

// inflate IDAT
const ds = new DecompressionStream("deflate");
const inflated = new Uint8Array(
  await new Response(new Blob([raw]).stream().pipeThrough(ds)).arrayBuffer(),
);

// unfilter scanlines
const out = new Uint8Array(height * stride);
let ip = 0;
for (let y = 0; y < height; y++) {
  const filter = inflated[ip++];
  const row = y * stride;
  const prev = row - stride;
  for (let x = 0; x < stride; x++) {
    const rawByte = inflated[ip++];
    const a = x >= channels ? out[row + x - channels] : 0;
    const b = y > 0 ? out[prev + x] : 0;
    const c = y > 0 && x >= channels ? out[prev + x - channels] : 0;
    let val: number;
    switch (filter) {
      case 0: val = rawByte; break;
      case 1: val = rawByte + a; break;
      case 2: val = rawByte + b; break;
      case 3: val = rawByte + ((a + b) >> 1); break;
      case 4: {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        val = rawByte + pred;
        break;
      }
      default: val = rawByte;
    }
    out[row + x] = val & 0xff;
  }
}

console.log(`${path}: ${width}x${height} (colorType ${colorType})`);

// per-band stats
for (let bandStart = 0; bandStart < height; bandStart += bandH) {
  const bandEnd = Math.min(bandStart + bandH, height);
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  let violet = 0;
  let bright = 0;
  for (let y = bandStart; y < bandEnd; y += 3) {
    const row = y * stride;
    for (let x = 0; x < width; x += 3) {
      const i = row + x * channels;
      const r = out[i], g = out[i + 1], b = out[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sum += lum;
      sumSq += lum * lum;
      n++;
      if (lum > 170) bright++;
      // violet-ish: blue-dominant purple, or the lightened brand violet
      if (b > 120 && b > g + 30 && r > g && r < b + 40) violet++;
    }
  }
  const mean = sum / n;
  const sd = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
  console.log(
    `y=${String(bandStart).padStart(5)}-${String(bandEnd).padStart(5)}  mean=${mean.toFixed(1).padStart(6)}  sd=${sd.toFixed(1).padStart(6)}  bright=${((bright / n) * 100).toFixed(1).padStart(5)}%  violet=${((violet / n) * 100).toFixed(1).padStart(5)}%`,
  );
}
