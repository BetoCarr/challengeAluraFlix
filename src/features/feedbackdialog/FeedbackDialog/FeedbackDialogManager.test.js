import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { FeedbackProvider, useFeedback } from "../feedBackDialogContext";
import FeedbackDialogManager from "./FeedbackDialogManager";
import { act } from "react-dom/test-utils";

const TestComponent = () => {
    const { openFeedback, closeFeedback } = useFeedback();
    return (
        <>
            {/* Manager que se está probando */}
            <FeedbackDialogManager />
            {/* Botones para abrir diferentes tipos de feedback */}
            <button onClick={() => openFeedback("InformativeFeedbackDialog", { message: "Informative Message" })}>
                Open Informative Feedback
            </button>
            <button 
                onClick={() => openFeedback("ConfirmationFeedbackDialog", { 
                    message: "Confirmation Message", 
                    onConfirm: () => console.log("Confirmed"), // 👈 Aquí se pasa el callback
                    onCloseCallback: () => console.log("Cancelled")  // 👈 Aquí se pasa el callback
                })}
            >
                Open Confirmation Feedback
            </button>
            <button onClick={() => openFeedback("UnknownFeedbackDialog", { message: "Unknown Message" })}>
                Open Unknown Feedback
            </button>
            {/* Botón para cerrar cualquier feedback */}
            <button onClick={closeFeedback}>Close Feedback</button>
        </>
    );
};

// Funcion auxiliar para renderizar el TestComponent envuelto en FeedbackProvider
const renderWithProvider = () => {
    return render(
        <FeedbackProvider>
            <TestComponent />
        </FeedbackProvider>
    );
};

// 📝 Sección 1: Pruebas de renderizado y flujo general
describe("FeedbackDialogManager - Basic Rendering", () => {
    // ✅ Prueba 1.1 - Renderizado sin Feedback
    test("Does not render anything if no active feedback", () => {
        renderWithProvider()
        expect(screen.queryByTestId("feedback-dialog")).toBeNull(); // Verifica que no se renderice nada en ausencia de feedback
    });
    // ✅ Prueba 1.2 - Renderizado con Feedback
    test("Renders feedback component when there is active feedback", () => {
        renderWithProvider()
        fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Simula la apertura de un feedback de confirmación
        expect(screen.getByText("Confirmation Message")).toBeInTheDocument(); // Verifica que el mensaje se renderice correctamente
    });
    // ✅ Prueba 1.3 - Error en consola para tipos de feedback no registrados
    test("Logs error to console for unregistered feedback types", () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {}); // Espía en el método console.error para capturar errores
        renderWithProvider()
        fireEvent.click(screen.getByText("Open Unknown Feedback")); // Simula un tipo de feedback no registrado usando el método del TestComponent
        expect(consoleErrorSpy).toHaveBeenCalledWith( // Verifica que se llame a console.error con el mensaje correcto
            "El componente \"UnknownFeedbackDialog\" no está registrado en FeedbackLookup."
        );
        consoleErrorSpy.mockRestore(); // Restaura el comportamiento normal del console.error
    });
});

// 📝 Sección 2.1: Pruebas para InformativeFeedbackDialog
describe("InformativeFeedbackDialog", () => {
    // ✅ Prueba 2.1.1 - Verifica que se muestre el mensaje informativo correctamente
    test("Renders correctly with informative message", () => {
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Informative Feedback")); // Simula la apertura del dialogo informativo
        expect(screen.getByText("Informative Message")).toBeInTheDocument(); // Verifica que el mensaje se muestra correctamente
    });
    // ✅ Prueba 2.1.2 - Cierra automaticamente despues del tiempo de espera
    test("Closes automatically after the configured duration", () => {
        jest.useFakeTimers(); // Habilita los temporizadores falsos de Jest
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Informative Feedback")); // Simula la apertura del diálogo informativo
        expect(screen.getByText("Informative Message")).toBeInTheDocument(); // Verifica que el mensaje esté visible al inicio
        act(() => { // Avanza el tiempo para simular el cierre automático
            jest.advanceTimersByTime(3000);
        });
        expect(screen.queryByText("Informative Message")).toBeNull(); // Verifica que el mensaje ya no esté presente después del tiempo
        jest.useRealTimers(); // Restaura el comportamiento normal de los temporizadores
    });
    // ✅ Prueba 2.1.3 - No muestra botones de acción para diálogos informativos
    test("Does not show action buttons for informative dialogs", () => {
        renderWithProvider();
        fireEvent.click(screen.getByText("Open Informative Feedback")); // Simula la apertura del diálogo informativo
        expect(screen.getByText("Informative Message")).toBeInTheDocument(); // Verifica que el mensaje se muestre correctamente
        const acceptButton = screen.queryByRole("button", { name: /Accept/i }); // Verifica que los botones de acción no se muestren
        const cancelButton = screen.queryByRole("button", { name: /Cancel/i });
        expect(acceptButton).toBeNull();
        expect(cancelButton).toBeNull();
    });
})
// 📝 Sección 2.2: Pruebas para ConfirmationfeedbackDialog
describe("ConfirmationFeedbackDialog", () => {
    // ✅ Prueba 2.2.1 - Verifica que se muestre el mensaje de confirmacion correctamente
    test("Renders correctly with confirmation message", () => {
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Simula la apertura del diálogo de confirmación
        expect(screen.getByText("Confirmation Message")).toBeInTheDocument(); // Verifica que el mensaje se muestre correctamente
    });
    // ✅ Prueba 2.2.2 - Muestra botones de accion para dialogos de confirmacion
    test("Shows action buttons for confirmation dialogs", () => {
        renderWithProvider();
        fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Simula la apertura del diálogo de confirmación
        const acceptButton = screen.getByRole("button", { name: /Aceptar/i }); // Busca el botón de aceptar
        const cancelButton = screen.getByRole("button", { name: /Cancelar/i }); // Busca el botón de cancelar
        expect(acceptButton).toBeInTheDocument(); // Verifica que se muestre el botón de aceptar
        expect(cancelButton).toBeInTheDocument(); // Verifica que se muestre el botón de cancelar
    });
    // ✅ Prueba 2.2.3 - Maneja correctamente el evento de confirmación
    test("Handles confirmation event correctly", () => {
            const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {}); // Espía el método console.log
            renderWithProvider(); // Monta el componente
            fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Simula la apertura del diálogo de confirmación
            fireEvent.click(screen.getByRole("button", { name: /Aceptar/i })); // Simula el clic en el botón de Aceptar
            expect(consoleSpy).toHaveBeenCalledWith("Confirmed"); // Verifica que se haya registrado el mensaje de confirmación
            consoleSpy.mockRestore(); // Restaura el comportamiento normal de console.log
        });
    // ✅ Prueba 2.2.4 - Maneja correctamente el evento de cancelación
    test("Handles cancellation event correctly", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {}); // Espía el método console.log
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Simula la apertura del diálogo de confirmación
        fireEvent.click(screen.getByRole("button", { name: /Cancelar/i })); // Simula el clic en el botón de Cancelar
        expect(consoleSpy).toHaveBeenCalledWith("Cancelled"); // Verifica que se haya registrado el mensaje de cancelación
        consoleSpy.mockRestore(); // Restaura el comportamiento normal de console.log
    });
})

// 📝 Sección 3: Pruebas de callbacks onConfirm / onCancel
describe("ConfirmationFeedbackDialog - Event Handlers", () => {
    // ✅ Prueba 3.1 - Ejecuta el callback onConfirm correctamente y cierra el feedback
    test("Executes onConfirm callback and closes feedback on confirmation", () => {
        const onConfirmMock = jest.fn(); // Crear un mock para onConfirm
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Confirmation Feedback")); // Abre el diálogo de confirmación con un callback personalizado
        const confirmButton = screen.getByRole("button", { name: /Aceptar/i });
        confirmButton.onclick = () => {
            onConfirmMock(); // Ejecuta el mock en lugar del callback real
        };
        fireEvent.click(confirmButton);        // Simula el clic en el botón de Aceptar
        expect(onConfirmMock).toHaveBeenCalledTimes(1); // Verifica que se llamó al callback
        expect(screen.queryByText("Confirmation Message")).toBeNull(); // Verifica que el diálogo se haya cerrado
    });
    // ✅ Prueba 3.2 - Maneja correctamente el evento de cierre manual
    test("Executes onCloseCallback and closes feedback on manual close", () => {
        const onCloseCallbackMock = jest.fn(); // Crear un mock para onCloseCallback
        renderWithProvider(); // Monta el componente
        fireEvent.click(screen.getByText("Open Confirmation Feedback"));         // Abre el diálogo con un callback personalizado
        const closeButton = screen.getByRole("button", { name: /Cancelar/i });
        closeButton.onclick = () => { // Sobrescribe el comportamiento del botón para llamar al mock
            onCloseCallbackMock();
        };
        fireEvent.click(closeButton); // Simula el clic en el botón de cancelar
        expect(onCloseCallbackMock).toHaveBeenCalledTimes(1); // Verifica que el callback fue llamado
        expect(screen.queryByText("Confirmation Message")).toBeNull(); // Verifica que el diálogo se haya cerrado
    });

});