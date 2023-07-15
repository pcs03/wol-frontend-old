import { useContext } from 'react';
import './DeviceInput.scss';
import { FormikErrors, Formik, Field, ErrorMessage } from 'formik';
import { DevicesContext } from '../../context/DeviceProvider';

const DeviceInput: React.FC = () => {
  const { devices, setDevices } = useContext(DevicesContext);

  return (
    <Formik
      initialValues={{
        name: '',
        mac: '',
        ip: '',
      }}
      validate={(values: Device) => {
        const errors: FormikErrors<Device> = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (values.name.length > 15) {
          errors.name = 'Must be 15 characters or less';
        }

        const macRegEx = /\b([0-9A-Fa-f]{12})\b/g;

        if (!values.mac) {
          errors.mac = 'Required';
        } else if (!macRegEx.test(values.mac)) {
          errors.mac = 'Invalid MAC Address';
        }

        const ipRegEx =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if (!values.ip) {
          errors.ip = 'Required';
        } else if (!ipRegEx.test(values.ip)) {
          errors.ip = 'Invalid IP Address';
        }

        return errors;
      }}
      onSubmit={(values) => {
        fetch('http://localhost:5000/addDevice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((data) => {
          console.log(data);
        });
        const newDevices = [...devices, values];
        setDevices(newDevices);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Device Name</label>
          <Field name="name" type="text" placeholder="Desktop" />
          <ErrorMessage name="name" />

          <label htmlFor="mac">Device MAC Address</label>
          <Field name="mac" type="text" placeholder="FFFFFFFFFFFF" />
          <ErrorMessage name="mac" />

          <label htmlFor="ip">Device IP Address</label>
          <Field name="ip" type="text" placeholder="0.0.0.0" />
          <ErrorMessage name="ip" />

          <button type="submit">Add</button>
        </form>
      )}
    </Formik>
  );
};

export default DeviceInput;
