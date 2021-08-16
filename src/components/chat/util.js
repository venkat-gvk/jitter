import axios from "axios";

export const addUser = async (username, secret) => {
  const data = { username, secret };

  const config = {
    method: "post",
    url: "https://api.chatengine.io/users/",
    headers: {
      "PRIVATE-KEY": process.env.REACT_APP_PRIVATE_KEY,
    },
    data: data,
  };

  let err = "";

  try {
    await axios(config);

    //
  } catch (error) {
    err = "username is already taken";
  }

  return err;
};

export const checkIfUserExists = async (username, secret) => {
  const config = {
    method: "get",
    url: "https://api.chatengine.io/users/me/",
    headers: {
      "Project-ID": process.env.REACT_APP_PROJECT_ID,
      "User-Name": username,
      "User-Secret": secret,
    },
  };

  try {
    await axios(config);

    return true;
    //
  } catch (error) {
    console.log("createusererror", error);

    return false;
  }
};
