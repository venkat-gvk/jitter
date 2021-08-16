import { useContext, useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import Loader from "react-loader-spinner";
import { authContext } from "../store/UserContext";
import { addUser, checkIfUserExists } from "./util";
import "./chat.css";
import { firebaseAuth } from "../firebase/config";
import { useHistory } from "react-router-dom";

const Chat = () => {
  const [newAccount, setNewAccount] = useState(false);

  const { auth } = firebaseAuth;

  const { userObject } = useContext(authContext);

  const user = userObject;

  const history = useHistory();

  useEffect(() => {
    // if no user is available, go to gandalf.
    if (!user) {
      setTimeout(() => {
        history.push("/you-shall-not-pass");
      }, 1000);

      return;
    }

    // Check for existing users
    checkIfUserExists(user.username, user.password).then((isUserAvailable) => {
      // if no users available, then create one and add to the firebase

      if (!isUserAvailable)
        addUser(user.username, user.password).then((err) => {
          if (err) console.log(err);
        });

      setNewAccount(true);
    });

    //
  }, []);

  return (
    <div>
      {user && newAccount && (
        <div className="logout">
          <button
            className="logout-btn"
            onClick={async () => {
              await auth.signOut();
            }}>
            Sign out
          </button>{" "}
        </div>
      )}

      {user && newAccount ? (
        <div className="chat-box">
          <ChatEngine
            offset={6}
            height="90vh"
            userName={user.username}
            userSecret={user.password}
            projectID={process.env.REACT_APP_PROJECT_ID}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <Loader
            type="TailSpin"
            color="#ff9d1e"
            height={80}
            width={80}
            timeout={10000} //10 secs
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
