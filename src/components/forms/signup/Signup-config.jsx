import * as Yup from "yup";

export const defaultValues = {
  email: "",
  password: "",
  reenter_password: "",
};

export const validatationSchema = Yup.object().shape({
  email: Yup.string().email().required("required"),

  password: Yup.string()
    .required("required")
    .matches(
      "^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$",
      "Please use letters or numbers"
    )
    .min(4, "must be altleast 4 chars long")
    .max(15, "not more than 15 chars"),

  reenter_password: Yup.string()
    .required("required")
    .oneOf([Yup.ref("password"), null], "password doesn't match"),
});
