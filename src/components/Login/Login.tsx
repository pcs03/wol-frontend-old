import './Login.scss';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data: LoginFormValues) => {
    const payload = {
      username: data.username,
      password: data.password,
    };

    login(payload);
  };

  async function login(payload: { username: string; password: string }) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
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
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-form-fields">
        <div className="device-input">
          <input {...register('username', { required: true })} placeholder="Username" />
          <p>{errors.username && <span>Username is required</span>}</p>
        </div>
        <div className="device-input">
          <input {...register('password', { required: true })} placeholder="Password" />
          <p>{errors.password && <span>Password is required</span>}</p>
        </div>
      </div>

      <div className="form-submit-container">
        <button type="submit" className="form-submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
