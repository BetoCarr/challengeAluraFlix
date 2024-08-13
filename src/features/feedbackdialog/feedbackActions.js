import { createAction } from '@reduxjs/toolkit'

// Acción para mostrar feedback
export const showFeedbackToUser = createAction('feedback/showFeedback')

// Acción para cerrar feedback
export const closeFeedback = createAction('feedback/closeFeedback');