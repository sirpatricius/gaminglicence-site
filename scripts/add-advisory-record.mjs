import { open, readFile, rename, rm, writeFile } from 'node:fs/promises';

const [name, domainInput, startDate] = process.argv.slice(2);
const domain = domainInput?.toLowerCase();
const start = new Date(startDate);
const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

if (!name?.trim() || !domain || domain.length > 253 || !domainPattern.test(domain) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate ?? '') || !Number.isFinite(start.getTime()) ||
    start.toISOString().slice(0, 10) !== startDate) {
  console.error('Usage: node scripts/add-advisory-record.mjs "Company or brand name" www.example.com YYYY-MM-DD');
  process.exit(1);
}

const end = new Date(start);
end.setUTCFullYear(end.getUTCFullYear() + 1);
if (end.getUTCMonth() !== start.getUTCMonth()) end.setUTCDate(0);

const recordsFile = new URL('../assets/advisory-records.json', import.meta.url);
const lockFile = new URL('advisory-records.json.lock', recordsFile);
const tempFile = new URL('advisory-records.json.tmp', recordsFile);
const lock = await open(lockFile, 'wx');
try {
  const records = JSON.parse(await readFile(recordsFile, 'utf8'));
  const canonicalDomain = domain.replace(/^www\./, '');
  if (records.some(record => record.domain.replace(/^www\./, '') === canonicalDomain)) {
    throw new Error('An advisory record already exists for this domain.');
  }

  const number = Math.max(10441, ...records.map(record => record.number)) + 1;
  records.push({ number, name: name.trim(), domain, startDate, endDate: end.toISOString().slice(0, 10) });
  await writeFile(tempFile, JSON.stringify(records, null, 2) + '\n');
  await rename(tempFile, recordsFile);
  console.log(`${number} ${domain}`);
} finally {
  try {
    await rm(tempFile, { force: true });
  } finally {
    await lock.close();
    await rm(lockFile, { force: true });
  }
}
