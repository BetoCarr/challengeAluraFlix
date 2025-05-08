// DefaultPage.test.js
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../utils/testUtils";
import DefaultPage from "./DefaultPage";

describe("DefaultPage", () => {
    test("renders Header, Footer, and children", () => {
        renderWithRouter(
            <DefaultPage>
                <p>Contenido de prueba</p>
            </DefaultPage>
        );
        
        // Verifica que el contenido dinámico se renderiza
        const content = screen.getByText(/contenido de prueba/i);
        expect(content).toBeInTheDocument();

        // Opcionalmente, verifica elementos clave de Header y Footer si son visibles
        // sin testearlos a fondo
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
    });
});
