import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";

export const authContext = createContext();

export const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState(null);

  const firstVisit = useRef(true);

  const createName = useCallback((email) => {
    return email ? email.substring(0, email.indexOf("@")) : "";
    //
  }, []);

  const history = useHistory();
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

        setTimeout(() => {
          firstVisit.current = false;

          setLoading(false);
          history.push("/chatroom");
        }, 1000);
      }

      // if this is the first visit to this page, then
      else if (!user && firstVisit.current) {
        setLoading(false);
        setUserObject(null);

        firstVisit.current = false;
        history.push("/home");
      }

      // if no user is currently available and not logged in
      else if (!user && !firstVisit.current) {
        setUserObject(null);

        setLoading(false);

        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }

      return () => unsubscribe();
    });
  }, []);

  return (
    <>
      <authContext.Provider value={userObject}>
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
