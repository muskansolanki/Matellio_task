import React from 'react'
import {FieldArray ,Field,ErrorMessage} from "formik"
function AddressFieldArray({values}) {
  return (
    <FieldArray name="addresses">
    {({ remove, push }) => (
        <div className='mt-3'>
            <button type="button" className="outline-btn" onClick={() => push({ streetAddress: '', city: '', state: '', postalCode: '', country: '' })}>
                <i className="pi pi-plus primary-color"></i> Add New Address
            </button>
            {values.addresses.map((address, index) => (
                <div key={index} style={{ marginBottom: '20px' }} className='address-wrapper'>
                    <div className='row justify-content-between'>
                        <div className="col-auto"><p className='fs-5 primary-color mb-0'>Address {index + 1}</p></div>
                        {
                            values?.addresses?.length > 1 ? <div className="col-auto"><button type="button" className='remove-btn' onClick={() => remove(index)}>
                                Remove
                            </button></div> : ""
                        }
                    </div>
                    <div className="row">
                        <div className='col-md-6'>
                            <label htmlFor={`addresses.${index}.streetAddress`}>Street Address:</label>
                            <Field type="text" id={`addresses.${index}.streetAddress`} name={`addresses.${index}.streetAddress`} />
                            <ErrorMessage name={`addresses.${index}.streetAddress`} component="div" className="error-message" />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor={`addresses.${index}.postalCode`}>Postal Code:</label>
                            <Field type="text" id={`addresses.${index}.postalCode`} name={`addresses.${index}.postalCode`} />
                            <ErrorMessage name={`addresses.${index}.postalCode`} component="div" className="error-message" />
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-4'>
                            <label htmlFor={`addresses.${index}.city`}>City:</label>
                            <Field type="text" id={`addresses.${index}.city`} name={`addresses.${index}.city`} />
                            <ErrorMessage name={`addresses.${index}.city`} component="div" className="error-message" />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor={`addresses.${index}.state`}>State:</label>
                            <Field type="text" id={`addresses.${index}.state`} name={`addresses.${index}.state`} />
                            <ErrorMessage name={`addresses.${index}.state`} component="div" className="error-message" />
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor={`addresses.${index}.country`}>Country:</label>
                            <Field type="text" id={`addresses.${index}.country`} name={`addresses.${index}.country`} />
                            <ErrorMessage name={`addresses.${index}.country`} component="div" className="error-message" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )}
</FieldArray>
  )
}

export default AddressFieldArray