import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import { FeedbackProvider } from "./feedBackDialogContext";
import { useFeedback } from './feedBackDialogContext';

//Componente auxiliar para realizar pruebas//
const TestComponent = () => {
    const { feedback, openFeedback, closeFeedback } = useFeedback();
    return (
        <div>
            <button onClick={() => openFeedback("ConfirmationFeedbackDialog", { message: "Test Message" })}>
                Open Feedback
            </button>
            <button onClick={closeFeedback}>Close Feedback</button>
            {feedback ? (
                <div data-testid="feedback-content">{feedback.props.message}</div>
            ) : (
                <div data-testid="no-feedback">No Feedback</div>
            )}
        </div>
    );
};

// 📝 Pruebas del FeedbackProvider

// Prueba básica para asegurar que el FeedbackProvider se renderiza sin errores
describe("FeedbackProvider", () => {
    test("renders without errors", () => {
        const { container } = render( // Renderiza el proveedor sin ningún hijo para verificar que no arroja errores
            <FeedbackProvider>
                <div>Test Content</div>
            </FeedbackProvider>
        );
        expect(container).toBeInTheDocument(); // Verifica que el contenido interno se renderiza correctamente
    });
});

// 🔗 Pruebas de métodos del FeedbackProvider
describe("FeedbackProvider Methods", () => {
    beforeEach(() => { // Renderiza el contexto con el componente de prueba antes de cada test
        render(
            <FeedbackProvider>
                <TestComponent />
            </FeedbackProvider>
        );
    });

    // ✅ Verifica que openFeedback actualiza el estado correctamente
    test("openFeedback updates state correctly", () => {
        expect(screen.getByTestId("no-feedback")).toBeInTheDocument(); // Verifica que inicialmente no hay feedback
        fireEvent.click(screen.getByText("Open Feedback")); // Simula un clic para abrir el feedback
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message"); // Verifica que el mensaje de feedback se muestre correctamente
    });

    // ✅ Verifica que closeFeedback limpia el estado correctamente
    test("closeFeedback clears the state correctly", () => {
        fireEvent.click(screen.getByText("Open Feedback")); // Abre el feedback primero para crear estado
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message");
        fireEvent.click(screen.getByText("Close Feedback")); // Cierra el feedback para limpiar el estado
        expect(screen.getByTestId("no-feedback")).toBeInTheDocument(); // Verifica que se haya limpiado correctamente
    });

    // ✅ Verifica que closeFeedback no cause errores si se llama sin feedback activo
    test("closeFeedback without prior open does not crash", () => {
        fireEvent.click(screen.getByText("Close Feedback")); // Intenta cerrar sin haber abierto feedback
        expect(screen.getByTestId("no-feedback")).toBeInTheDocument(); // Verifica que no haya cambios inesperados
    });

    // ✅ Verifica que openFeedback maneja correctamente los props después de cerrar
    test("openFeedback handles props correctly", () => {
        fireEvent.click(screen.getByText("Open Feedback")); // Abre el feedback por primera vez
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message");
        fireEvent.click(screen.getByText("Close Feedback")); // Cierra y vuelve a abrir el feedback
        fireEvent.click(screen.getByText("Open Feedback"));
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message"); // Verifica que los props no se hayan perdido
    });
});