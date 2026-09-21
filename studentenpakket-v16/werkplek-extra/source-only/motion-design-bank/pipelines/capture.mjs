// Frame capture for deterministic HTML motion designs (see html-motion-video.md).
// Page contract: window.DUR (ms), window.SEEK(ms), window.READY (promise),
//                optional window.REMAPS = { <mode>: [[outMs, masterMs], ...] }.
//
// Usage: node capture.mjs <file.html> <mode> <outDir> [--alpha] [--fps N] [--w N] [--h N]
//   mode: 'qa' (10 spread stills) | 'full' (every frame) | any key of window.REMAPS
//
// Needs: npm i puppeteer-core  (uses system Chrome, no Chromium download)
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(name);
  return i === -1 ? dflt : args[i + 1];
};
const ALPHA = args.includes('--alpha');
const FPS = Number(flag('--fps', 30));
const W = Number(flag('--w', 1080)), H = Number(flag('--h', 1080));
const [htmlFile, mode = 'qa', outDir = 'frames'] = args.filter(a => !a.startsWith('--') && a !== flag('--fps') && a !== flag('--w') && a !== flag('--h'));

if (!htmlFile) { console.error('usage: node capture.mjs <file.html> <mode> <outDir> [--alpha] [--fps N]'); process.exit(1); }
const url = 'file://' + encodeURI(path.resolve(htmlFile)) + '?capture' + (ALPHA ? '&alpha' : '');
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--force-device-scale-factor=1', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.evaluate(() => window.READY);
await new Promise(r => setTimeout(r, 300));

const DUR = await page.evaluate(() => window.DUR);
const REMAPS = await page.evaluate(() => window.REMAPS || {});
if (!DUR) { console.error('page does not expose window.DUR'); process.exit(1); }

async function shot(ms, name) {
  await page.evaluate(t => window.SEEK(t), Math.round(ms));
  await new Promise(r => setTimeout(r, 30));
  await page.screenshot({ path: `${outDir}/${name}.png`, omitBackground: ALPHA });
}

if (mode === 'qa') {
  for (let i = 0; i < 10; i++) {
    const ms = Math.round((i + 0.5) / 10 * DUR);
    await shot(ms, 't' + String(ms).padStart(5, '0'));
  }
  console.log('QA frames done');
} else if (mode === 'full') {
  const total = Math.round(DUR / 1000 * FPS);
  for (let f = 0; f < total; f++) {
    await shot(f * 1000 / FPS, 'f' + String(f).padStart(4, '0'));
    if (f % 60 === 0) console.log(`frame ${f}/${total}`);
  }
  console.log('ALL frames done:', total);
} else if (REMAPS[mode]) {
  const anchors = REMAPS[mode];
  const remap = ms => {
    for (let i = 1; i < anchors.length; i++) {
      const [o0, m0] = anchors[i - 1], [o1, m1] = anchors[i];
      if (ms <= o1) return m0 + (m1 - m0) * (ms - o0) / (o1 - o0);
    }
    return anchors[anchors.length - 1][1];
  };
  const outDur = anchors[anchors.length - 1][0];
  const total = Math.round(outDur / 1000 * FPS);
  for (let f = 0; f < total; f++) {
    await shot(remap(f * 1000 / FPS), 'f' + String(f).padStart(4, '0'));
  }
  console.log(`REMAP '${mode}' frames done:`, total);
} else {
  console.error(`unknown mode '${mode}' — page REMAPS has: ${Object.keys(REMAPS).join(', ') || '(none)'}`);
  process.exit(1);
}
await browser.close();
