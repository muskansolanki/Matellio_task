import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { removeFormData } from '../redux/formSlice';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

function PersonalInfoTable() {
  // Redux state and dispatch setup
  const formData = useSelector((state) => state.form.formData);
  const [expandedRows, setExpandedRows] = useState(null);
  const dispatch = useDispatch();

  // Ref for Toast notifications
  const toast = useRef();

  // Function to determine if a row can be expanded
  const allowExpansion = (rowData) => {
    return rowData?.addresses?.length > 0;
  };

  const showRejectionToast = ()=>{
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  // Confirm delete popup handler
  const confirmDelete = (event, data) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        removeFormDataFromTable(data?._id);
      },
      reject: () => {
        showRejectionToast();
      },
    });
  };

  // Row expansion template for address details
  const addressRowTemplate = (data) => {
    return (
      <div className="address-subtable px-5">
        <p className='mb-0'>Address of {data.firstName}</p>
        <DataTable value={data.addresses}>
          <Column field="city" header="City" />
          <Column field="country" header="Country" />
          <Column field="postalCode" header="Postal Code" />
          <Column field="state" header="State" />
          <Column field="streetAddress" header="Street Address" />
        </DataTable>
      </div>
    );
  };

  // Remove data from table handler
  const removeFormDataFromTable = (id) => {
    dispatch(removeFormData(id));
  };

  // Template for delete button
  const deleteInfoTemplate = (data) => {
    return (
      <div className='bg-dange mt-2'>
        <button onClick={(e) => confirmDelete(e, data)} className='remove-btn'>
          <i className='pi pi-times'></i>
        </button>
      </div>
    );
  };

  return (
    <div className='container'>
      {/* Toast component for displaying notifications */}
      <Toast ref={toast} />

      {/* ConfirmPopup component for delete confirmation */}
      <ConfirmPopup />

      <div className="row my-4">
        <div className="col-md-12">
          {/* Link to navigate to the page for adding personal details */}
          <Link to="/" className='navigation-btn'>
            Add Personal Details
          </Link>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-md-12">
          <div className="outer-card p-0">
            {formData && (
              <DataTable
                value={formData}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={addressRowTemplate}
              >
                {/* Column for expanding rows */}
                <Column expander={allowExpansion} style={{ width: '3em' }} />
                <Column field="firstName" header="First Name" />
                <Column field="lastName" header="Last Name" />
                <Column field="email" header="Email" />
                <Column field="phoneNumber" header="Phone No" />
                <Column field="dateOfBirth" header="Date of birth" />
                <Column field="gender" header="Gender" />
                {/* Column for delete action */}
                <Column
                  header="action"
                  body={deleteInfoTemplate}
                />
              </DataTable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoTable;
