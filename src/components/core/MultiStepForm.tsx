/* eslint-disable no-alert */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../layouts';

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
};

type AddressInfo = {
  address: string;
  city: string;
  state: string;
  zip: string;
};

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    const savedAddressInfo = localStorage.getItem('addressInfo');
    if (savedPersonalInfo) setPersonalInfo(JSON.parse(savedPersonalInfo));
    if (savedAddressInfo) setAddressInfo(JSON.parse(savedAddressInfo));
  }, []);

  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    localStorage.setItem('addressInfo', JSON.stringify(addressInfo));
  }, [personalInfo, addressInfo]);

  const handleNext = () => {
    if (validate()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const validate = () => {
    const newErrors: any = {};
    if (step === 1) {
      if (!personalInfo.name) newErrors.name = 'Name is required';
      if (!personalInfo.email) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(personalInfo.email))
        newErrors.email = 'Email is invalid';
      if (!personalInfo.phone) newErrors.phone = 'Phone is required';
    } else if (step === 2) {
      if (!addressInfo.address)
        newErrors.address1 = 'Address Line 1 is required';
      if (!addressInfo.city) newErrors.city = 'City is required';
      if (!addressInfo.state) newErrors.state = 'State is required';
      if (!addressInfo.zip) newErrors.zip = 'Zip Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('Form submitted!');
    }
  };

  return (
    <MainLayout>
      <section className=" my-12 p-6">
        <div className="container mx-auto max-w-fit p-5 py-12 md:p-14  bg-white shadow-inner shadow-gray-400 border-b rounded-md">
          {/* button back or next */}
          <div className="mb-4">
            <div className="flex justify-between">
              <button
                type="button"
                className={`px-4 py-2 ${
                  step === 1 ? 'text-gray-500' : 'text-orange-500'
                }`}
                disabled={step === 1}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="px-4 py-2 text-indigo-500  rounded-xl"
                onClick={step === 3 ? handleSubmit : handleNext}
              >
                {step === 3 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
          {/* button div */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-xl ${
                step === 1
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              onClick={() => setStep(1)}
            >
              Step 1
            </button>
            <button
              type="button"
              className={`px-4 py-2 mx-2  rounded-xl ${
                step === 2
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              onClick={() => setStep(2)}
            >
              Step 2
            </button>
            <button
              type="button"
              className={`px-4 py-2  rounded-xl ${
                step === 3
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              onClick={() => setStep(3)}
            >
              Step 3
            </button>
          </div>
          {step === 1 && (
            // personal information
            <div>
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border outline-orange-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                  value={personalInfo.name}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border outline-orange-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input
                  type="tel"
                  className={`w-full px-3 py-2 border outline-orange-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          )}
          {step === 2 && (
            // address information
            <div>
              <h3 className="text-xl font-bold mb-4">Address Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                  <label className="block mb-2">Address Line 1</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border outline-orange-500 ${
                      errors.address1 ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    value={addressInfo.address}
                    onChange={(e) =>
                      setAddressInfo({
                        ...addressInfo,
                        address: e.target.value,
                      })
                    }
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-sm">{errors.address1}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">City</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border outline-orange-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    value={addressInfo.city}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, city: e.target.value })
                    }
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">State</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border outline-orange-500 ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    value={addressInfo.state}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, state: e.target.value })
                    }
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Zip Code</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border outline-orange-500 ${
                      errors.zip ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    value={addressInfo.zip}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, zip: e.target.value })
                    }
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Confirmation</h3>
              <div className="mb-4">
                <h3 className="font-semibold">Personal Information:</h3>
                <p>Name: {personalInfo.name}</p>
                <p>Email: {personalInfo.email}</p>
                <p>Phone: {personalInfo.phone}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold">Address Information:</h3>
                <p>Address Line 1: {addressInfo.address}</p>
                <p>City: {addressInfo.city}</p>
                <p>State: {addressInfo.state}</p>
                <p>Zip Code: {addressInfo.zip}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default MultiStepForm;
