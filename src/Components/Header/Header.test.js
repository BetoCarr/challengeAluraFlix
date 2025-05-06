import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";

describe('Header component', () => {
    test('should render the icon correctly and navigate to HomePage', () => {
        render(
            <MemoryRouter initialEntries={['/other-page']}>
                <Routes>
                    <Route path="*" element={<Header />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );
        // Verifica que la imagen del logo se renderiza
        const logo = screen.getByRole('img');
        const logoLink = screen.getByRole('link', { name: /sportflix logo/i });
        // screen.debug()
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('LogoMain'));
    
        fireEvent.click(logoLink);

        // Verifica que la navegación sucedió mostrando contenido de Home
        expect(screen.getByText(/home page/i)).toBeInTheDocument();
    })
    test('Should render "Nueva Categoria" button and link to /new-category', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/new-category" element={<div>Formulario Nueva Categoría</div>} />
                </Routes>
            </MemoryRouter>
        );
        // Obtener el botón por su texto
        const button = screen.getByRole('button', { name: /nueva categoria/i });
        // Simular clic en el botón
        fireEvent.click(button);
        // Verificar que el contenido de la nueva ruta se muestra
        expect(screen.getByText(/formulario nueva categoría/i)).toBeInTheDocument();
    });
})
