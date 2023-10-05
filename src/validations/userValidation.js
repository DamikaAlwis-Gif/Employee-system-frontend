import * as yup from 'yup';
// first check is at last
const userValidation = yup.object().shape({
  firstName: yup
    .string()
    // .matches(/^[A-Z]+/, "Name shold start with a capital letter")
    .matches(/^[a-z A-Z]+$/, "Name should contain letters only")
    .required("First Name is required"),
  lastName: yup
    .string()
    .matches(/^[a-z A-Z]+$/, "Name should contain letters only")
    .required("Last Name is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
});
export default userValidation;