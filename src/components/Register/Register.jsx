import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";


export default function Register() {

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useContext(userContext);
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 letters")
      .max(15, "name maximum lenght is 15 letters"),
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][A-Za-z0-9]/, "password must start with uppercase letter & contain letters and numbers only"),
    age: Yup.number()
      .required("age is required")
      .min(18, "you must be at least 18 years old"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}/, "please enter a valid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    validationSchema,
    onSubmit: async function (values) {
      setIsLoading(true)
      try {
        let res = await signUp(values);
        if (res.msg === "done") {
          setIsLoading(false);
        navigate('/login');
        setIsError(null);
      } 
      
      } catch (error) {
        setIsLoading(false);
        setIsError(error.response.data.msg);
      
     }
    }
    
  });

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            {isError ? <p className="text-danger">{ isError}</p> : ""}
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : ""}
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="text-danger">{formik.errors.email}</div> : ""}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : ""}
            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? <div className="text-danger">{formik.errors.age}</div> : ""}
            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? <div className="text-danger">{formik.errors.phone}</div> : ""}
            {isLoading? <button type="button" className="btn btn-main"> <i className="fa fa-spin fa-spinner fs-5"></i>
            </button> : <button type="submit" className="btn btn-main">
              Create account
            </button>}
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
