{
/* Simple entry point file to the Firebase module.
   Other firebase files will only be exposed to this
   file, and this file will soley communicate with Firebase. */
}

import * as auth from './auth';
import * as firebase from './firebase';

export {
  auth,
  firebase,
};
