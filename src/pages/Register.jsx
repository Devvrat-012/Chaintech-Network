import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  resetError,
} from "../redux/user/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for registration form using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short").required("Name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password Required"),
});

function Register() {
  // Hooks for dispatching actions and navigation
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Reset error state on component mount
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  // Handle form submission for registration
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    dispatch(registerStart());

    try {
      // Check if a user with the entered email already exists
      if (currentUser?.email) {
        throw new Error("User already exists");
      }
      dispatch(registerSuccess(values));
      navigate("/account");
    } catch (err) {
      dispatch(registerFailure(err.message));
      setErrors({ main: err.message });
    }
    setSubmitting(false);
  };

  return (
    <main className="bg-[#508bfc] h-screen">
      <div className="container mx-auto py-5 h-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-5 text-center">
              <h3 className="text-2xl font-semibold mb-5">Register</h3>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-700"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-700"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-700"
                      />
                    </div>

                    <button
                      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="submit"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Logging in..." : "Register"}
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-sm mt-2">
                <span className="">Already have an account?</span>{" "}
                <span
                  className="text-green-700 underline hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </div>

              {error && <div className="text-red-700">{error}</div>}
              <hr className="my-4 border-gray-300" />

              <button
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2 flex items-center justify-center"
                type="button"
              >
                Register with Google
              </button>
              <button
                className="w-full py-2 px-4 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2 flex items-center justify-center"
                type="button"
              >
                Register with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
