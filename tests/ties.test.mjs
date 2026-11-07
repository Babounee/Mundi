// Ties with you (issue #1 on GitHub): a spouse, fiancé or friend added in This world → Family and ties is no longer a
// stranger, in saves made before the fix too (save format 2); and playing as someone gives you the job the world gave
// them. Run: node tests/ties.test.mjs [repo root]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stage, browser, seed, world } from './env.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = process.argv[2] ?? path.join(here, '..');
const ext = stage(root, 'ties');
const meta = {}; browser(meta);
const D = (p) => import(`${ext}/dist/${p}`);
const store = await D('core/store.js'); const W = await D('core/world.js'); const S = await D('core/saves.js');
const living = await D('sim/living.js'); const social = await D('sim/social.js'); const romance = await D('sim/romance.js');
const playas = await D('sim/playas.js');
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log('  FAIL', m); } };
const fixture = (f) => JSON.parse(fs.readFileSync(path.join(here, 'fixtures', f), 'utf8'));
const open = (s) => { for (const k of Object.keys(meta)) delete meta[k]; meta.mundi = s; return store.game(); };
seed(5);
const w = world(ext, 'modern'); W.registerWorld(w);

ok(S.SCHEMA >= 2, 'the save format is at least 2');

// a save from before the fix: the ties are there, nothing else
{
    const s = fixture('v0.1.0-modern.json'); s.schema = 1;
    const [spouse, divorced, friend, other] = Object.keys(s.cast);
    s.living ??= {}; s.social ??= {}; s.romance ??= {};
    for (const a of [spouse, divorced, friend, other]) { delete s.social.bond[a]; (s.living.approval ??= {})[a] = 0; delete s.romance[a]; s.cast[a].met = false; }
    s.social.partner = [];
    s.living.ties = [
        { a: '__you', b: spouse, type: 'spouse', tone: 'close' },
        { a: spouse, b: '__you', type: 'spouse', tone: 'close' },            // the same tie told from the other side
        { a: '__you', b: divorced, type: 'spouse', tone: 'neutral' },
        { a: '__you', b: friend, type: 'friend', tone: 'good' },
        { a: other, b: spouse, type: 'friend', tone: 'good' },               // not with you: left alone
    ];
    s.romance[divorced] = { value: 35, status: 'none' };                    // divorced in the game: the tie is still listed
    s.social.bond[friend] = 12;                                             // you have talked: a little bond
    const g = open(s);
    ok(S.schemaOf(g) === S.SCHEMA, 'the save is brought to the current format');
    ok(romance.romOf(g, spouse).status === 'married', `a spouse is married (${romance.romOf(g, spouse).status})`);
    ok(social.bondLabel(g, spouse) === 'Partner', `a spouse is a partner, not a stranger (${social.bondLabel(g, spouse)})`);
    ok(g.cast[spouse].met === true, 'a spouse has been met');
    ok(social.bondOf(g, spouse) >= 80, `a spouse starts close (${social.bondOf(g, spouse)})`);
    ok(romance.romOf(g, divorced).status === 'none' && social.bondOf(g, divorced) === 0, 'a divorce is never undone');
    ok(social.bondOf(g, friend) === 12 && g.cast[friend].met === false, 'someone you already have a bond with is left alone');
    ok(social.bondOf(g, other) === 0 && !g.cast[other].met, 'ties between two others do not touch your relationships');
    ok(S.backups().some(b => /before the update/.test(b.reason)), 'a backup is kept before the migration');
    // safe to run twice
    const once = JSON.stringify(g);
    living.backfillYourTies(g); living.backfillYourTies(g);
    ok(JSON.stringify(g) === once, 'running it again changes nothing');
}

// a save already at the current format is not touched
{
    const s = fixture('v0.1.0-modern.json'); s.schema = S.SCHEMA;
    const [a] = Object.keys(s.cast);
    s.living ??= {}; s.living.ties = [{ a: '__you', b: a, type: 'spouse', tone: 'close' }]; delete s.social.bond[a]; delete s.romance[a];
    const g = open(s);
    ok(romance.romOf(g, a).status === 'none', 'a save at the current format is not changed on open');
}

// the tie added now still works (This world → Family and ties)
{
    const g = open(fixture('v0.1.0-modern.json'));
    const [a] = Object.keys(g.cast);
    living.applyTie(g, { a: '__you', b: a, type: 'fiance' });
    ok(romance.romOf(g, a).status === 'engaged' && social.isPartner(g, a), 'adding a fiancé now makes them engaged');
    living.applyTie(g, { a: '__you', b: a, type: 'friend' });
    ok(romance.romOf(g, a).status === 'engaged', 'a weaker tie never lowers it');
}

// playing as someone: the job the world gave them
{
    const g = open(fixture('v0.1.0-modern.json'));
    const [a, b, c] = Object.keys(g.cast);
    g.cast[a].occupation = 'developer'; g.cast[b].occupation = null; g.cast[c].occupation = 'no-such-job';
    const j = playas.worldJobOf(g, w, a);
    ok(j && j.id === 'developer' && j.rank === 0 && j.shifts === 0, 'you start with the job the world gave them, at the first rank');
    ok(playas.worldJobOf(g, w, b) === null, 'no job in the world: no job');
    ok(playas.worldJobOf(g, w, c) === null, 'a job the world does not have: no job');
    ok(playas.worldJobOf(g, w, 'nobody.png') === null, 'someone who is not in the world: no job');
    const off = { ...w, features: { ...(w.features ?? {}), jobs: false } };
    ok(W.systemOn(off, 'jobs') === false, 'the test world really has jobs turned off');
    ok(playas.worldJobOf(g, off, a) === null, 'with jobs turned off: no job');
}

console.log(fails ? `${fails} failed, ${passes} passed` : `${passes} passed, 0 failed`);
process.exit(fails ? 1 : 0);
