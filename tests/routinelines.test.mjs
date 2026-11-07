// What the AI is told about the people here by their routine (issue #2 on GitHub): someone at work says so, and what
// comes next, so "why are you here?" gets a true answer. Run: node tests/routinelines.test.mjs [repo root]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stage, browser, seed, world } from './env.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = process.argv[2] ?? path.join(here, '..');
const ext = stage(root, 'routinelines');
const meta = {}; browser(meta);
const D = (p) => import(`${ext}/dist/${p}`);
const store = await D('core/store.js'); const W = await D('core/world.js');
const time = await D('sim/time.js'); const DL = await D('sim/daylife.js'); const P = await D('sim/prompt.js');
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log('  FAIL', m); } };
const fixture = (f) => JSON.parse(fs.readFileSync(path.join(here, 'fixtures', f), 'utf8'));
const open = (s) => { for (const k of Object.keys(meta)) delete meta[k]; meta.mundi = s; return store.game(); };
seed(8);
const modern = world(ext, 'modern'); W.registerWorld(modern);

const job = modern.occupations.find(o => o.place === 'mall');
const ROUTINE = { weekday: [[0, 'home'], [9, 'work'], [17, 'home']], weekend: [[0, 'home'], [9, 'work'], [17, 'home']] };
const g = open(fixture('v0.1.0-modern.json'));
const names = Object.keys(g.cast);
const [a, b] = names;
for (const n of names) { g.cast[n].occupation = job.id; g.cast[n].routine = structuredClone(ROUTINE); g.cast[n].met = true; }
// an ordinary day for both: no sickness, errand or visit
let day = g.day;
while (DL.breakOf(g, modern, g.cast[a], day) || DL.breakOf(g, modern, g.cast[b], day)) day++;
const at = (hour) => { g.day = day; g.minutes = hour * 60 + 5; };
const where = job.place;
const mall = modern.places.find(p => p.id === where);
g.player.loc = where;

// at work, mid-morning
at(10);
let lines = DL.routineLines(g, modern, [g.cast[a]]);
ok(lines.length === 1 && lines[0].startsWith(`${g.cast[a].name} is at work (${job.name})`), `at work: ${lines[0]}`);
ok(/Next, from 17:00: home\./.test(lines[0]), `and what comes next: ${lines[0]}`);
ok(!/\{\{|undefined|null/.test(lines[0]), 'no stray template text');

// at home in the evening: the person is at home (you are at their door)
at(18);
g.player.loc = `home:${a}`;
lines = DL.routineLines(g, modern, [g.cast[a]]);
ok(lines.length === 1 && /is at home/.test(lines[0]) && !/Next/.test(lines[0]), `at home, nothing more today: ${lines[0]}`);

// someone whose routine puts them elsewhere is not described as being here
at(10);
g.player.loc = 'cafe';
ok(DL.routineLines(g, modern, [g.cast[a]]).length === 0, 'someone who is not where the routine puts them: no line');

// a crowded place costs at most 4 lines
g.player.loc = where;
const crowd = names.slice(0, 6).map(n => g.cast[n]);
for (const r of crowd) { r.occupation = job.id; }
const many = DL.routineLines(g, modern, crowd.filter(r => !DL.breakOf(g, modern, r, day)));
ok(many.length <= 4, `at most 4 lines (${many.length})`);

// a world with the living system off sends nothing
const off = { ...modern, features: { ...(modern.features ?? {}), living: false } };
ok(DL.routineLines(g, off, [g.cast[a]]).length === 0, 'living system off: nothing');

// it reaches the AI in the scene focus block
at(10);
g.player.loc = where;
const people = await D('sim/people.js');
ok(people.presentAt(g, modern, where).some(r => r.avatar === a), 'at 10:05 on an ordinary day the person is at the mall');
const focus = P.sceneBlocks().find(x => x.id === 'focus');
ok(!!focus && focus.state === 'sent' && focus.text.includes(`${g.cast[a].name} is at work (${job.name})`), `the scene focus block carries it (${focus?.state}: ${focus?.text.slice(0, 120)})`);

console.log(fails ? `${fails} failed, ${passes} passed` : `${passes} passed, 0 failed`);
process.exit(fails ? 1 : 0);
