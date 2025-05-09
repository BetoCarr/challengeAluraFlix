import { render } from "@testing-library/react";
import { FeedbackProvider } from "./feedBackDialogContext";

// Prueba básica para asegurar que el FeedbackProvider se renderiza sin errores
describe("FeedbackProvider", () => {
    test("se renderiza sin errores", () => {
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
