import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useEffect } from "react";
import { userContext } from "../../Context/UserContext";
import { useState } from "react";

export default function Login() {

  const { signIn ,setToken , token} = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("please enter a valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][A-Za-z0-9]/, "password must start with uppercase letter & contain letters and numbers only")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async function (values) {
      setIsLoading(true);
      const res = await signIn(values);
      setIsLoading(false);

      if (res.msg === "done") {
        localStorage.setItem("token", `3b8ny__${res.token}`);
        setToken(`3b8ny__${res.token}`);
      }
    }
    
  });

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={formik.handleSubmit} className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
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
            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/register" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
