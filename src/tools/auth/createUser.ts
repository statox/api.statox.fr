/**
 * Create a user in the table User to be authenticated in the API
 *
 * Usage:
 *      node dist/src/tools/auth/createUser.js
 *
 * TODO: Test it on the prod db
 * TODO: Make it take the username and password as input
 */
import { initDb } from '../../libs/databases/db.js';
import { createUser } from '../../libs/modules/auth/index.js';

await initDb();
console.log('initDb done');
await createUser('admin', 'foo', ['admin']);
await createUser('user', 'foo', ['homeTracker']);
await createUser('nottuser', 'foo', []);
console.log('createUser done');
process.exit(0);
