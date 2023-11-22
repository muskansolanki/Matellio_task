import * as Yup from 'yup';
import { ERROR_MESSAGES } from './constants';
// Address validation schema
const addressValidationSchema = Yup.object().shape({
    streetAddress: Yup.string().required(ERROR_MESSAGES.streetAddress),
    city: Yup.string().required(ERROR_MESSAGES.city),
    state: Yup.string().required(ERROR_MESSAGES.state),
    postalCode: Yup.string().matches(/^[0-9]{5,}$/, ERROR_MESSAGES.postalCode.invalid).required(ERROR_MESSAGES.postalCode.required),
    country: Yup.string().required(ERROR_MESSAGES.country),
});

// Main validation schema
export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(`First Name${ERROR_MESSAGES.required}`),
    lastName: Yup.string().required(`Last Name${ERROR_MESSAGES.required}`),
    email: Yup.string().email(ERROR_MESSAGES.email).required(`Email${ERROR_MESSAGES.required}`),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, ERROR_MESSAGES.phoneNumber).required(`Phone Number${ERROR_MESSAGES.required}`),
    dateOfBirth: Yup.date().required(`Date of Birth${ERROR_MESSAGES.required}`).max((new Date(new Date().setFullYear(new Date().getFullYear() - 18))), ERROR_MESSAGES.dateOfBirth),
    gender: Yup.string().required(ERROR_MESSAGES.gender),
    addresses: Yup.array().of(addressValidationSchema).min(1, ERROR_MESSAGES.addresses.min)
});