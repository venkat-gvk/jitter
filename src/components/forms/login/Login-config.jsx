import * as Yup from "yup";

export const defaultValues = {
  email: "",
  password: "",
};

export const validatationSchema = Yup.object().shape({
  email: Yup.string().email().required("required"),

  password: Yup.string()
    .required("required")
    .min(4, "must be altleast 4 chars long")
    .max(15, "max 15 chars"),
});
