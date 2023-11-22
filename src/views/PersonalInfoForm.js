import React, { useRef, useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormSummaryModal from '../components/FormSummaryModal';
import { useDispatch } from 'react-redux';
import { setFormData } from '../redux/formSlice';
import { Link } from 'react-router-dom';
import { v1 as uuidv4 } from "uuid";
import { Toast } from 'primereact/toast';
import AddressFieldArray from '../components/AddressFieldArray';

function PersonalInfoForm() {
    const [formSummary, setFormSummary] = useState(null);
    const [isFormSummaryModalVisible, setFormSummaryModalVisible] = useState(false);

    const dispatch = useDispatch();
    const toastRef = useRef()

    // Address validation schema
    const addressValidationSchema = Yup.object().shape({
        streetAddress: Yup.string().required('Street Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postalCode: Yup.string().matches(/^[0-9]{5,}$/, 'Invalid postal code').required('Postal Code is required'),
        country: Yup.string().required('Country is required'),
    });

    // Main validation schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone Number is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required').max((new Date(new Date().setFullYear(new Date().getFullYear() - 18))), 'Must be 18 years or older'),
        gender: Yup.string().required('Gender is required'),
        addresses: Yup.array().of(addressValidationSchema).min(1, 'At least one address is required'), // Ensure at least one address
    });

    // FORM SUBMISSION 
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        setFormSummary(values);
        setFormSummaryModalVisible(true);
        values._id = uuidv4();
        dispatch(setFormData(values));
        actions.resetForm()
        // Add toast message code
        const message = {
            severity: 'success',
            summary: 'Form Submitted Successfully',
            detail: 'Your form data has been submitted successfully.',
        };
        toastRef.current.show(message);

    };


    return (
        <div className='container'>
            <div className="row my-4">
                <div className="col-md-12">
                    <Link to="/personal-info-table" className='navigation-btn'>All Personal Details</Link>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-md-8">
                    <div className="outer-card info-form">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                phoneNumber: '',
                                dateOfBirth: '',
                                gender: '',
                                addresses: [{ streetAddress: '', city: '', state: '', postalCode: '', country: '' }],
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {({ values }) => (
                                <Form>
                                    <div className='row'>
                                        <div className='col-md-6 form-item'>
                                            <label htmlFor="firstName">First Name:</label>
                                            <Field type="text" id="firstName" name="firstName" />
                                            <ErrorMessage name="firstName" component="div" className="error-message" />
                                        </div>
                                        <div className='col-md-6 form-item'>
                                            <label htmlFor="lastName">Last Name:</label>
                                            <Field type="text" id="lastName" name="lastName" />
                                            <ErrorMessage name="lastName" component="div" className="error-message" />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 form-item'>
                                            <label htmlFor="email">Email:</label>
                                            <Field type="email" id="email" name="email" />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className='col-md-6 form-item'>
                                            <label htmlFor="phoneNumber">Phone Number:</label>
                                            <Field type="text" id="phoneNumber" name="phoneNumber" />
                                            <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-item">
                                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                                            <Field type="date" id="dateOfBirth" name="dateOfBirth" />
                                            <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
                                        </div>
                                        <div className="col-md-6 form-item">
                                            <label htmlFor="gender">Gender:</label>
                                            <Field as="select" id="gender" name="gender">
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Addresses Fields*/}
                                    <AddressFieldArray values={values} />

                                    <div className="row">
                                        <div className="col-md-12 text-end">
                                            <button type="submit" className='submit-btn'>Submit</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="col-md-4 registration-img">
                    <img src="./assets/registration.svg" alt="registration-img" />
                </div>
            </div>
            <Toast ref={toastRef} />
            <FormSummaryModal
                visible={isFormSummaryModalVisible}
                onHide={() => {
                    setFormSummaryModalVisible(false);
                    setFormSummary(null);
                }}

                formSummary={formSummary}
            />
        </div>
    )
}

export default PersonalInfoForm