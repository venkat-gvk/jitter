import { Formik, Form, Field, ErrorMessage } from "formik";
import { defaultValues, validatationSchema } from "./Update-config";
import { useState } from "react";

import { resetPassword } from "../../firebase/firebase-login";

import Loader from "react-loader-spinner";
import PopupModal from "../PopupModal";

import Jitter from "../Jitter";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailRes, setEmailRes] = useState("");

  const handleReset = ({ email }) => {
    setLoading(true);

    resetPassword(email).then((response) => {
      response === "yes"
        ? setEmailRes("follow the instructions sent to your mail")
        : setEmailRes(response);

      setLoading(false);
    });
  };

  return (
    <>
      {emailRes && <PopupModal error={emailRes} setError={setEmailRes} />}

      <section className="flex justify-center items-center space-y-4 min-h-full sm:min-h-screen relative top-12 sm:static">
        <div className="outer-box">
          <div className="inner-box">
            {/* App Name */}

            <Jitter />

            {!loading ? (
              <>
                <Formik
                  onSubmit={handleReset}
                  initialValues={defaultValues}
                  validationSchema={validatationSchema}>
                  <Form className="space-y-4">
                    <section className="space-y-3">
                      <Field
                        name="email"
                        type="text"
                        className="input"
                        placeholder="Email"
                      />

                      <ErrorMessage
                        component="span"
                        name="email"
                        className="text-red-600"
                      />
                    </section>

                    <section>
                      <button className="submit" type="submit">
                        Send email
                      </button>
                    </section>
                  </Form>
                </Formik>
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

export default ResetPassword;
