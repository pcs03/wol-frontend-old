import { useContext } from 'react';
import './DeviceInput.scss';
import { FormikErrors, Formik, Field, ErrorMessage } from 'formik';
import { DevicesContext } from '../../context/DeviceProvider';

function capitalizeLetters(string: string) {
  const upperCase = string.replace(/[a-zA-Z]/g, (match) => {
    return match.toUpperCase();
  });
  const noColon = upperCase.replace(/:/g, '');
  const noHyphen = noColon.replace(/-/g, '');

  return noHyphen;
}

const DeviceInput: React.FC = () => {
  const { setDevices } = useContext(DevicesContext);

  async function addDevice(payload: string) {
    const response = await fetch('http://192.168.2.162:5000/addDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    const body = await response.json();
    console.log(body);
    setDevices(body.devices);
  }

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
        const macRegexSep = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        const macRegEx = /\b([0-9A-Fa-f]{12})\b/g;

        if (!values.mac) {
          errors.mac = 'Required';
        } else if (values.mac.length === 17 && !macRegexSep.test(values.mac)) {
          errors.mac = 'Invalid MAC Address';
        } else if (values.mac.length === 12 && !macRegEx.test(values.mac)) {
          errors.mac = 'Invalid MAC Address';
        } else if (values.mac.length !== 12 && values.mac.length !== 17) {
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
        values['mac'] = capitalizeLetters(values['mac']);
        console.log(values);
        const payload = JSON.stringify(values);
        addDevice(payload);
      }}
    >
      {(formik) => (
        <form className="device-form" onSubmit={formik.handleSubmit}>
          <div className="form-fields">
            <div className="device-input">
              <label htmlFor="name">Device Name</label>
              <Field name="name" type="text" placeholder="Desktop" />
              <ErrorMessage name="name" />
            </div>
            <div className="device-input">
              <label htmlFor="mac">Device MAC Address</label>
              <Field name="mac" type="text" placeholder="FFFFFFFFFFFF" />
              <ErrorMessage name="mac" />
            </div>
            <div className="device-input">
              <label htmlFor="ip">Device IP Address</label>
              <Field name="ip" type="text" placeholder="0.0.0.0" />
              <ErrorMessage name="ip" />
            </div>
          </div>

          <div className="form-submit-container">
            <button type="submit" className="form-submit">
              Add Device
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DeviceInput;
