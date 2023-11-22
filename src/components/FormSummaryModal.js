import React from 'react';
import { Dialog } from 'primereact/dialog';

const FormSummaryModal = ({ visible, onHide, formSummary }) => {
  return (
    <Dialog visible={visible} onHide={onHide} header="Personal Information" modal>
      <pre>{JSON.stringify(formSummary, null, 2)}</pre>
      <div className='text-end'>
        <button className='outline-btn py-1 ms-1' onClick={()=>onHide()}>OK</button>
      </div>
    </Dialog>
  );
};

export default FormSummaryModal;