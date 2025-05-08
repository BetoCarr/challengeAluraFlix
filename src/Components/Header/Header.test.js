import { screen, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithMemoryRouter } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe('Header component', () => {
    test('should render the icon correctly and navigate to HomePage', async () => {
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
        await waitFor(() => userEvent.click(logoLink)); // Simular clic en el botón
        expect(await screen.findByText(/home page/i)).toBeInTheDocument(); // Verifica que la navegación sucedió mostrando contenido de Home
    })
    test('Should render "Nueva Categoria" button and link to /new-category', async () => {
        renderWithMemoryRouter(
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/new-category" element={<div>Formulario Nueva Categoría</div>} />
            </Routes>,
            ['/']
        );
        const button = screen.getByRole('button', { name: /nueva categoria/i }); // Obtener el botón por su texto
        await waitFor(() => userEvent.click(button)); // Simular clic en el botón
        expect(await screen.findByText(/formulario nueva categoría/i)).toBeInTheDocument(); // Verifica que la navegación sucedió mostrando contenido de NewCategoryForm
    });
})
