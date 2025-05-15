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

// Prueba básica para asegurar que el FeedbackProvider se renderiza sin errores
describe("FeedbackProvider", () => {
    test("renders without errors", () => {
        // Renderiza el proveedor sin ningún hijo para verificar que no arroja errores
        const { container } = render(
            <FeedbackProvider>
                <div>Test Content</div>
            </FeedbackProvider>
        );
        // Verifica que el contenido interno se renderiza correctamente
        expect(container).toBeInTheDocument();
    });
});

describe("FeedbackProvider Methods", () => {
    beforeEach(() => {
        render(
            <FeedbackProvider>
                <TestComponent />
            </FeedbackProvider>
        );
    });

    test("openFeedback updates state correctly", () => {
        // Verifica que inicialmente no hay feedback
        expect(screen.getByTestId("no-feedback")).toBeInTheDocument();

        // Abre el feedback
        fireEvent.click(screen.getByText("Open Feedback"));
        
        // Verifica que el feedback se abrió correctamente
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message");
    });

    test("closeFeedback clears the state correctly", () => {
        // Abre el feedback primero
        fireEvent.click(screen.getByText("Open Feedback"));
        expect(screen.getByTestId("feedback-content")).toHaveTextContent("Test Message");

        // Luego lo cierra
        fireEvent.click(screen.getByText("Close Feedback"));
        expect(screen.getByTestId("no-feedback")).toBeInTheDocument();
    });
});

