import './Login.scss';
import React, { useEffect, useState } from 'react';
import { FormikErrors, Formik, Field, ErrorMessage } from 'formik';
import { DevicesContext } from '../../context/DeviceProvider';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

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

        signIn({
          token: 'test',
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { username: 'testuser' },
        });

        navigate('/');
      }}
    >
      {(formik) => (
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="login-form-fields">
            <div className="device-input">
              <Field name="username" type="text" placeholder="Username" />
              <ErrorMessage name="username" />
            </div>
            <div className="device-input">
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
