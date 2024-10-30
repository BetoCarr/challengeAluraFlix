// FeedbackContext.js
import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

// Crea el contexto
const FeedbackContext = createContext();

// 2. Crear el proveedor del contexto
    export const FeedbackProvider = ({ children }) => {
        const [dialogState, setDialogState] = useState({
            isOpen: false,
            message: '',
            onConfirm: null,
            onCancel: null,
            confirmLabel: '',
            cancelLabel: '',
            showActions: false,
            actionType: '',
            categoryId: null,
    });

     // Memoiza las funciones para evitar recrearlas en cada render
    const openDialog = useCallback((dialogProps) => {
        setDialogState(prevState => ({ ...prevState, ...dialogProps, isOpen: true }));
    }, []);

    const closeDialog = useCallback(() => {
        setDialogState(prevState => ({ ...prevState, isOpen: false }));
    }, []);

    // Memoize the context value
    const contextValue = useMemo(
        () => ({ dialogState, openDialog, closeDialog }),
        [dialogState, openDialog, closeDialog]
    );

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
        </FeedbackContext.Provider>
    );
};

// 3. Crear un hook para usar el contexto
export const useFeedback = () => useContext(FeedbackContext);
