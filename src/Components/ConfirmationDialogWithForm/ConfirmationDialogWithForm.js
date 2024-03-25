import React, { useState } from 'react';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';

function ConfirmationDialogWithForm({ isOpen, onClose, message, onConfirm, confirmLabel, onCancel, cancelLabel, formComponent }) {

    const [showForm, setShowForm] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setShowForm(true);
    };

    const handleCancel = () => {
        onCancel();
        setShowForm(false);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    return (
        <>
            <FeedbackDialog
                isOpen={isOpen}
                onClose={onClose}
                message={message}
                onConfirm={handleConfirm}
                confirmLabel={confirmLabel}
                onCancel={handleCancel}
                cancelLabel={cancelLabel}
            />
            {showForm && formComponent(handleFormClose)}
        </>
    );
}

export default ConfirmationDialogWithForm;
