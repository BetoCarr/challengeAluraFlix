// FeedbackContext.js
import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

// Crea el contexto
const FeedbackContext = createContext();

// 2. Crear el proveedor del contexto
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(null)

    const openFeedback = (name, props = {}) => {
        setFeedback({ name, props })
    }
    const closeFeedback = () => setFeedback(null)

    return (
        <FeedbackContext.Provider value={{ feedback, openFeedback, closeFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};

// 3. Crear un hook para usar el contexto
export const useFeedback = () => useContext(FeedbackContext);
