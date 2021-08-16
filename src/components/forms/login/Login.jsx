import { Formik, Form } from "formik";
import { defaultValues, validatationSchema } from "./Login-config";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  signInWithEmail,
  signInWithGoogle,
} from "../../firebase/firebase-login";

import Loader from "react-loader-spinner";
import PopupModal from "../PopupModal";
import FormRender from "../FormRender";
import Jitter from "../Jitter";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const history = useHistory();

  const handleEmailLogin = ({ email, password }) => {
    setLoading(true);

    signInWithEmail(email, password).then((response) => {
      setLoginError(response);

      setLoading(false);
    });
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    signInWithGoogle().then((response) => {
      setLoginError(response);

      setLoading(false);
    });
  };

  return (
    <>
      {loginError && <PopupModal error={loginError} setError={setLoginError} />}

      <section className="flex justify-center items-center space-y-4 min-h-full sm:min-h-screen relative top-12 sm:static">
        <div className="outer-box">
          <div className="inner-box">
            {/* App Name */}

            <Jitter />

            {!loading ? (
              <>
                <Formik
                  onSubmit={handleEmailLogin}
                  initialValues={defaultValues}
                  validationSchema={validatationSchema}>
                  <Form className="space-y-4">
                    <FormRender />

                    <section>
                      <button className="submit" type="submit">
                        Sign in
                      </button>
                    </section>
                  </Form>
                </Formik>

                <div className="mt-4 p-1 space-y-1">
                  <p>
                    Don't have an Account?{" "}
                    <span
                      className="text-[#ffb048] font-semibold cursor-pointer hover:border-b border-[#ffb048]"
                      onClick={() => history.push("/signup")}>
                      Sign up
                    </span>
                  </p>

                  <button
                    className=" text-gray-400 font-thin hover:text-gray-300"
                    onClick={() => history.push("/reset-user")}>
                    forgot password?
                  </button>
                </div>

                <section>
                  <button
                    className="google-login relative mt-1"
                    onClick={handleGoogleLogin}>
                    <img
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      className="w-5 h-5 absolute my-auto inset-y-0 sm:left-20"
                      alt="google-img"
                    />
                    Login with Google
                  </button>
                </section>
              </>
            ) : (
              <div className="flex justify-center items-center h-64">
                <Loader
                  type="BallTriangle"
                  color="#ff9d1e"
                  height={80}
                  width={80}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
