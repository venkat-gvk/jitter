import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";

export const authContext = createContext();

export const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState(null);

  const createName = useCallback((email) => {
    return email ? email.substring(0, email.indexOf("@")) : "";
    //
  }, []);

  const history = useHistory();

  const firstVisit = useRef(true);

  const { auth } = firebaseAuth;

  // run only on fresh visit and no user is available
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if user is available and logged in

      if (user) {
        // if displayName propery is available, then logged in by google or by any provider
        if (user.displayName)
          setUserObject({
            username: user.displayName,
            password: user.uid,
          });
        // if displayName property is not available, then logged in by email and password
        else {
          setUserObject({
            username: createName(user.email),
            password: user.uid,
          });
        }

        firstVisit.current = false;

        setTimeout(() => {
          setLoading(false);
          history.push("/chatroom");
        }, 1000);
      }

      // if user signedout
      else if (!user && !firstVisit.current) {
        setUserObject(null);

        setLoading(false);

        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }

      //if this is the first visit
      else {
        setUserObject(null);

        setLoading(false);
      }

      return () => unsubscribe();
    });
  }, [history]);

  const value = { userObject };

  return (
    <>
      <authContext.Provider value={value}>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader
              type="TailSpin"
              color="#ff9d1e"
              height={80}
              width={80}
              timeout={10000} //10 secs
            />
          </div>
        ) : (
          children
        )}
      </authContext.Provider>
    </>
  );
};
