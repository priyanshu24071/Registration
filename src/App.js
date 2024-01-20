import React, { useState } from 'react';
import * as yup from 'yup';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const stepOneSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dobOrAge: yup.string().required('Date of Birth or Age is required'),
  sex: yup.string().required('Sex is required'),
  mobile: yup.string().required('Mobile is required'),
  govtId: yup.string().required('Government ID is required'),
  zip: yup.string().required('Zip is required'),
  gridCheck: yup.boolean().oneOf([true], 'You must check this box to proceed'),
});

const stepTwoSchema = yup.object().shape({
  fullAddress: yup.string().required('Full Address is required'),
});

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dobOrAge: '',
    sex: '',
    mobile: '',
    govtId: '',
    zip: '',
    gridCheck: false,
    fullAddress: '',
  });
  const [errors, setErrors] = useState({});


  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (step === 1) {
        await stepOneSchema.validate(formData, { abortEarly: false });
      } else if (step === 2) {
        await stepTwoSchema.validate(formData, { abortEarly: false });
      }

      // Validation successful, move to the next step
      setStep(step + 1);
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div style={{ marginLeft: "20%" }} className='rounded col-md-8 shadow p-4'>
          {step === 1 ? (
            <>
              <h2 className='text-center heading'>Registration - Step 1</h2>
              <form className="row g-3 mt-5" onSubmit={handleSubmit}>
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
                <div className="col-md-4">
                  <label htmlFor="dobOrAge" className="form-label">Date Of Birth Or Age</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dobOrAge"
                    onChange={handleChange}
                    value={formData.dobOrAge}
                  />
                  {errors.dobOrAge && <p className="text-danger">{errors.dobOrAge}</p>}
                </div>
                <div className="col-md-4">
                  <label htmlFor="sex" className="form-label">Sex</label>
                  <select
                    id="sex"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.sex}
                  >
                    <option defaultValue>Choose...</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                  {errors.sex && <p className="text-danger">{errors.sex}</p>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    onChange={handleChange}
                    value={formData.mobile}
                  />
                  {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                </div>
                <div className="col-md-2">
                  <label htmlFor="govtId" className="form-label">Govt Id</label>
                  <select
                    id="govtId"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.govtId}
                  >
                    <option defaultValue>Choose...</option>
                    <option>Aadhar</option>
                    {/* Add other options as needed */}
                  </select>
                  {errors.govtId && <p className="text-danger">{errors.govtId}</p>}
                </div>
                <div className="col-md-4">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    onChange={handleChange}
                    value={formData.zip}
                  />
                  {errors.zip && <p className="text-danger">{errors.zip}</p>}
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      onChange={() => setFormData({ ...formData, gridCheck: !formData.gridCheck })}
                      checked={formData.gridCheck}
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Check me out
                    </label>
                    {errors.gridCheck && <p className="text-danger">{errors.gridCheck}</p>}
                  </div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Next</button>
                </div>

              </form>
            </>
          ) : (
            <>
              <h2 className='text-center heading'>Registration - Step 2</h2>
              <form className="row g-3 mt-5" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="fullAddress" className="form-label">Full Address</label>
                  <textarea
                    className="form-control"
                    id="fullAddress"
                    rows="3"
                    onChange={handleChange}
                    value={formData.fullAddress}
                  ></textarea>
                  {errors.fullAddress && <p className="text-danger">{errors.fullAddress}</p>}
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </>
          )}
           <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
