/**
 * Create a user in the table User to be authenticated in the API.
 * This script is used both in local dev and on production.
 *
 * It prompts from a username, password and suggests a list of scopes
 * to assign to the user and creates an entry in the connected db.
 *
 * Usage:
 *      # You should be using npm run create:user instead
 *      node dist/src/tools/auth/createUser.js
 *
 * TODO: Largely vibe-coded, I need to better understand the input handling code
 * TODO: The interactive prompt for the scopes is a bit broken I can't add a
 *       new line between the prompt and the first option of the list.
 */
import { initDb } from '../../libs/databases/db.js';
import { createUser } from '../../libs/modules/auth/index.js';

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { SCOPES, Scope } from '../../libs/routes/types.js';

const rl = readline.createInterface({ input, output });

const username = await rl.question('username: ');
const password = await rl.question('password: ');

const scopes: Set<Scope> = new Set();

let index = 0;

function render() {
    output.write('\x1Bc');
    output.write('select scopes (space = toggle, enter = confirm)');

    SCOPES.forEach((s, i) => {
        const cursor = i === index ? '>' : ' ';
        const mark = scopes.has(s) ? '[x]' : '[ ]';
        output.write(`${cursor} ${mark} ${s}\n`);
    });
}

render();

input.setRawMode(true);
input.resume();
input.setEncoding('utf8');

const done = new Promise<void>((resolve) => {
    input.on('data', (key) => {
        // @ts-expect-error TODO Find a proper typing
        if (key === '\u0003') process.exit(1);
        // @ts-expect-error TODO Find a proper typing
        if (key === '\r') return resolve();
        // @ts-expect-error TODO Find a proper typing
        if (key === '\u001b[A') {
            index = Math.max(0, index - 1);
            render();
        }
        // @ts-expect-error TODO Find a proper typing
        if (key === '\u001b[B') {
            index = Math.min(SCOPES.length - 1, index + 1);
            render();
        }
        // @ts-expect-error TODO Find a proper typing
        if (key === ' ') {
            const s = SCOPES[index];
            if (scopes.has(s)) scopes.delete(s);
            else scopes.add(s);
            render();
        }
    });
});

await done;

input.setRawMode(false);
console.log('About to create user:');
console.log(username, password.replaceAll(/./g, '*'), Array.from(scopes));

const confirm = await rl.question('confirm create? [y/N] ');
if (confirm.toLowerCase() !== 'y') {
    console.log('aborted');
    process.exit(0);
}

await initDb();
await createUser(username, password, Array.from(scopes));
console.log('createUser done');
process.exit(0);
