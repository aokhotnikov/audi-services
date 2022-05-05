'use strict';
/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
import * as glob from 'glob';
import camelCase from 'camelcase';
import * as admin from 'firebase-admin';
try { admin.initializeApp() } catch (e) { }
const firestore = admin.firestore();
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 0;
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' });
for (const file of files) {
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file)
  }
}
