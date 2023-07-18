import './Login.scss';
import React, { useEffect, useState } from 'react';
import { FormikErrors, Formik, Field, ErrorMessage } from 'formik';
import { DevicesContext } from '../../context/DeviceProvider';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validate={(values: LoginFormValues) => {
        const errors: FormikErrors<LoginFormValues> = {};
        if (!values.username) {
          errors.username = 'Required';
        } else if (values.username.length > 15) {
          errors.username = 'Must be 15 characters or less';
        }

        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 8) {
          errors.password = 'Must be at least 8 characters';
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
        const payload = JSON.stringify(values);
      }}
    >
      {(formik) => (
        <form className="device-form" onSubmit={formik.handleSubmit}>
          <div className="form-fields">
            <div className="device-input">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" placeholder="Username" />
              <ErrorMessage name="username" />
            </div>
            <div className="device-input">
              <label htmlFor="password">Password</label>
              <Field name="password" type="text" placeholder="Password" />
              <ErrorMessage name="password" />
            </div>
          </div>

          <div className="form-submit-container">
            <button type="submit" className="form-submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
