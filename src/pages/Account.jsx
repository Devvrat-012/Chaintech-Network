import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logout,
} from "../redux/user/userSlice";

const Account = () => {
  // Dispatch and navigate hooks for Redux and React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting user, loading, and error states from Redux store
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handle form submission for updating user information
  const handleUpdate = async (values) => {
    dispatch(updateUserStart());

    try {
      const updatedUser = { ...user, ...values };

      dispatch(updateUserSuccess(updatedUser));
      alert("Account information updated");
    } catch (error) {
      dispatch(updateUserFailure("Failed to update account information"));
      alert("Failed to update account information");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Validation schema for form fields using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <main className="bg-[#508bfc] h-screen">
      <div className="container mx-auto py-5 h-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-5 text-center">
              <h3 className="text-2xl font-semibold mb-5">
                Account Information
              </h3>
              {user && (
                <Formik
                  initialValues={{
                    name: user.name,
                    email: user.email,
                    password: user.password,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdate}
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
                        type="submit"
                        className="w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading || isSubmitting}
                      >
                        {loading || isSubmitting ? "Updating..." : "Update"}
                      </button>
                      <button
                        type="button"
                        className="w-full mt-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      {error && (
                        <div className="text-red-700 mt-3">{error}</div>
                      )}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
