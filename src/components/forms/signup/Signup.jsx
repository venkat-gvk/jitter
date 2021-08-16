import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { defaultValues, validatationSchema } from "./Signup-config";
import { createNewUser } from "../../firebase/firebase-login";

import Loader from "react-loader-spinner";
import FormRender from "../FormRender";
import PopupModal from "../PopupModal";
import Jitter from "../Jitter";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const history = useHistory();

  const handleUpdateUser = ({ email, password }) => {
    setLoading(true);

    createNewUser(email, password).then((response) => {
      setSignupError(response);

      setLoading(false);
    });
  };

  return (
    <>
      {signupError && (
        <PopupModal error={signupError} setError={setSignupError} />
      )}

      <section className="flex justify-center items-center space-y-4 min-h-full sm:min-h-screen relative top-12 sm:static">
        <div className="outer-box">
          <div className="inner-box">
            <Jitter />

            {!loading ? (
              <>
                <Formik
                  onSubmit={handleUpdateUser}
                  initialValues={defaultValues}
                  validationSchema={validatationSchema}>
                  <Form className="space-y-4">
                    <FormRender />

                    <section className="space-y-3">
                      <div className="relative">
                        <Field
                          name="reenter_password"
                          type="password"
                          className="input"
                          placeholder="Re-enter password"
                        />
                      </div>

                      <ErrorMessage
                        component="span"
                        name="reenter_password"
                        className="text-red-600"
                      />
                    </section>

                    <section>
                      <button className="submit" type="submit">
                        Sign up
                      </button>
                    </section>
                  </Form>
                </Formik>

                <div className="mt-4 p-1">
                  <p>
                    Have an Account already?{" "}
                    <span
                      className="text-[#ffb048] font-semibold cursor-pointer hover:border-b border-[#ffb048]"
                      onClick={() => history.push("/login")}>
                      Login
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-64">
                <Loader
                  type="BallTriangle"
                  color="#ff9d1e"
                  height={80}
                  width={80}
                  timeout={10000} //10 secs
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
