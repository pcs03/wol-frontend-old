import './Login.scss';
import React from 'react';
import { FormikErrors, Formik, Field, ErrorMessage } from 'formik';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  async function login(payload: { username: string; password: string }) {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_HOST}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
    const body = await response.json();
    const token = body['token'];
    const expIn = body['exp'];

    if (token && token !== '') {
      signIn({
        token: token,
        expiresIn: expIn,
        tokenType: 'Bearer',
        authState: { username: payload.username },
      });

      navigate('/');
    } else {
      console.log('Error login in');
    }
  }

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

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);

        const payload = {
          username: values.username,
          password: values.password,
        };

        login(payload);
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
              <Field name="password" type="password" placeholder="Password" />
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
