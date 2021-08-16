import { firebaseAuth } from "./config";

const { auth, googleProvider } = firebaseAuth;

export const signInWithEmail = async (email, password) => {
  let err = "";

  try {
    await auth.signInWithEmailAndPassword(email, password);

    //
  } catch (error) {
    if (error.code === "auth/invalid-email") err = "invalid email";
    else if (error.code === "user-disabled") err = "user disabled";
    else if (error.code === "auth/user-not-found") err = "user not found";
    else err = "wrong password";
  }

  return err;
};

export const signInWithGoogle = async () => {
  let err = "";

  try {
    await auth.signInWithPopup(googleProvider);

    //
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential")
      err = "already exists an account with the email";
    else if (error.code === "auth/cancelled-popup-request")
      err = "only one popup is allowed at one time";
    else if (error.code === "auth/popup-closed-by-user")
      err = "popup window is closed before auth";
  }

  return err;
};

export const createNewUser = async (email, password) => {
  let err = "";

  try {
    await auth.createUserWithEmailAndPassword(email, password);

    //
  } catch (error) {
    if (error.code === "auth/email-already-in-use")
      err = "email already exists try another name";
    else if (error.code === "auth/invalid-email")
      err = "email address is not valid";
    else if (error.code === "auth/weak-password")
      err = "password is not strong enough";
  }

  return err;
};

export const resetPassword = async (email) => {
  let res = "";

  try {
    await auth.sendPasswordResetEmail(email);
    res = "yes";
    //
  } catch (error) {
    if (error.code === "auth/invalid-email") res = "provided email is invalid";
    else if (error.code === "auth/user-not-found")
      res = "No corresponding user found";
  }

  return res;
};
