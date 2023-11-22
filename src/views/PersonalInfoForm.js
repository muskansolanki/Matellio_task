import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormSummaryModal from '../components/FormSummaryModal';
import { useDispatch } from 'react-redux';
import { setFormData } from '../redux/formSlice';
import { Link, useNavigate } from 'react-router-dom';
import { v1 as uuidv4 } from "uuid";
import { Toast } from 'primereact/toast';
import AddressFieldArray from '../components/AddressFieldArray';
import { validationSchema } from '../validation';

function PersonalInfoForm() {
    const [formSummary, setFormSummary] = useState(null);
    const [isFormSummaryModalVisible, setFormSummaryModalVisible] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const toastRef = useRef()    

    // FORM SUBMISSION 
    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        // setFormSummary(values); // Currently redirecting to the data table, so there's no need for this at the moment.
        // setFormSummaryModalVisible(true);
        values._id = uuidv4();
        dispatch(setFormData(values));
        actions.resetForm()
        navigate('/personal-info-table')
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