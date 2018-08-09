/* Firebase authentication API defined here:
      • SignUp
      • SignIn
      • SignOut
      • etc...

   Interface between the offical Firebase API
   and this React application. Endpoints are called
   asynchronously. */


/* Import instantiated authentication object
from Firebase config. */
import { auth } from './firebase';

/* Sign Up:
    Takes email and password parameters and uses
    Firebase endpoint from the firebase object to
    create a user. */
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

/* Sign In:
    Takes email and password parameters and uses
    Firebase endpoint to sign in a user. */
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

/* Sign Out:
   Logs out the currently signed in user. */
export const doSignOut = () =>
  auth.signOut();

/* Password Reset:
    Takes email as parameter and sends an email
    to the user to reset their password. */
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

/* Password Change:
    Takes the new password as an argument to
    update the password of a user. */
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

/* Delete User:
    Deletes the currently logged in user from Firebase. */
export const doDeleteUser = () =>
  auth.currentUser.delete();
