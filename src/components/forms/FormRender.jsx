import { ErrorMessage, Field } from "formik";
import { useState } from "react";

const FormRender = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <section className="space-y-3">
        <Field name="email" type="text" className="input" placeholder="Email" />

        <ErrorMessage component="span" name="email" className="text-red-600" />
      </section>

      <section className="space-y-3">
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
          />

          <div
            className="show-hide-password hover:bg-gray-500"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "hide" : "show"}
          </div>
        </div>

        <ErrorMessage
          component="span"
          name="password"
          className="text-red-600"
        />
      </section>
    </>
  );
};

export default FormRender;
