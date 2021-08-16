import * as Yup from "yup";

export const defaultValues = {
  email: "",
};

export const validatationSchema = Yup.object().shape({
  email: Yup.string().email().required("Must not be empty"),
});
