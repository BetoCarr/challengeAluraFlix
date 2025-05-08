import { screen, fireEvent } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithMemoryRouter } from "../../utils/testUtils";
import Header from "./Header";

describe('Header component', () => {
    test('should render the icon correctly and navigate to HomePage', () => {
        renderWithMemoryRouter(
            <Routes>
                <Route path="*" element={<Header />} />
                <Route path="/" element={<div>Home Page</div>} />
            </Routes>,
            ['/other-page']
        );
        const logo = screen.getByRole('img'); // Verifica que la imagen del logo se renderiza

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('LogoMain'));

        const logoLink = screen.getByRole('link', { name: /sportflix logo/i });
        fireEvent.click(logoLink); // Simular clic en el botón
        expect(screen.getByText(/home page/i)).toBeInTheDocument(); // Verifica que la navegación sucedió mostrando contenido de Home
    })
    test('Should render "Nueva Categoria" button and link to /new-category', () => {
        renderWithMemoryRouter(
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/new-category" element={<div>Formulario Nueva Categoría</div>} />
            </Routes>,
            ['/']
        );
        const button = screen.getByRole('button', { name: /nueva categoria/i }); // Obtener el botón por su texto
        fireEvent.click(button); // Simular clic en el botón
        expect(screen.getByText(/formulario nueva categoría/i)).toBeInTheDocument(); // Verificar que el contenido de la nueva ruta se muestra
    });
})
