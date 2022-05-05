/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import * as functions from 'firebase-functions';

import { UserService } from '../user/user.service';

export = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST' ) {
    return res.status(403).send('Http method forbidden!');
  }
  if (!req.body.username) {
    return res.status(403).send(`Field 'username' is required`);
  }
  if (!req.body.password) {
    return res.status(403).send(`Field 'password' is required`);
  }

  const docs = await UserService.getUserDocsByUsername(req.body.username);
  if (docs.length) {
    return res.status(417).send('User already exists!');
  }

  const user = await UserService.addNewUser(req.body.username, req.body.password);

  return res.json(user);
});
