import { useContext } from 'react';
import './DeviceInput.scss';
import { DevicesContext } from '../../context/DeviceProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

type DeviceInput = {
  devicename: string;
  username: string;
  ip: string;
  mac: string;
};

const DeviceInput: React.FC = () => {
  const { setDevices } = useContext(DevicesContext);

  const usernamePattern = /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/;
  const ipPattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const macPattern = /^([0-9A-Fa-f]{12}|([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2})$/;

  const userSchema = object({
    devicename: string().required('Required').max(15, 'Too long'),
    username: string().required('Required').matches(usernamePattern, 'Not a valid username'),
    mac: string().required('Required').matches(macPattern, 'Not a valid MAC Address').uppercase(),
    ip: string().required('Required').matches(ipPattern, 'Not a valid IP Address'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<DeviceInput> = (data: DeviceInput) => {
    console.log(data);
    const payload = JSON.stringify(data);
    addDevice(payload);
  };

  async function addDevice(payload: string) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOST}/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const body = await response.json();
    setDevices(body);
  }

  return (
    <form className="device-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-fields">
        <div className="device-input">
          <label htmlFor="devicename">Device Name</label>
          <input {...register('devicename')} placeholder="Desktop" />
          <p>{errors.devicename?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="username">User Name</label>
          <input {...register('username')} placeholder="john" />
          <p>{errors.username?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="mac">Device MAC Address</label>
          <input {...register('mac')} placeholder="FFFFFFFFFFFF" />
          <p>{errors.mac?.message}</p>
        </div>
        <div className="device-input">
          <label htmlFor="ip">Device IP Address</label>
          <input {...register('ip')} placeholder="0.0.0.0" />
          <p>{errors.ip?.message}</p>
        </div>
      </div>

      <div className="form-submit-container">
        <button type="submit" className="form-submit">
          Add Device
        </button>
      </div>
    </form>
  );
};

export default DeviceInput;
