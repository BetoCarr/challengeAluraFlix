import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackDialog from './FeedbackDialog';

describe('FeedbackDialog', () => {

    const message = 'Mensaje de prueba';
    // Verifica que el mensaje se renderice correctamente en el componente
    test('renders the message correctly', () => {
        render(
            <FeedbackDialog 
                message="Hola mundo" 
                onClose={() => {}} 
                showActions={false} 
            />
        );
        expect(screen.getByText('Hola mundo')).toBeInTheDocument();
    });
    // Verifica que los botones no se muestren cuando showActions es false
    test('does not render buttons when showActions is false', () => {
        render(
            <FeedbackDialog 
                message="Mensaje oculto" 
                onClose={() => {}} 
                showActions={false} 
            />
        );
        expect(screen.queryByText('Aceptar')).not.toBeInTheDocument();
        expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();
    });
    // Verifica que los botones se rendericen cuando showActions es true
    test('renders buttons when showActions is true', () => {
        render(
            <FeedbackDialog 
                message="Confirmation message" 
                onClose={() => {}} 
                onConfirm={() => {}} 
                showActions={true} 
            />
        );
        expect(screen.getByText('Aceptar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });
    // Verifica que se llame a la función onClose al hacer clic en el botón "Cancelar"
    test('calls onClose when clicking the Cancel button', () => {
        const onCloseMock = jest.fn();
        render(<FeedbackDialog message={message} onClose={onCloseMock} onConfirm={() => {}} showActions={true} />);
        fireEvent.click(screen.getByText('Cancelar'));
        expect(onCloseMock).toHaveBeenCalled();
    });
    // Verifica que se llame a la función onConfirm al hacer clic en el botón "Aceptar"
    test('calls onConfirm when clicking the Accept button', () => {
        const onConfirmMock = jest.fn();
        render(<FeedbackDialog message={message} onClose={() => {}} onConfirm={onConfirmMock} showActions={true} />);
        fireEvent.click(screen.getByText('Aceptar'));
        expect(onConfirmMock).toHaveBeenCalled();
    });
    // Verifica que el padding-bottom sea de 20px cuando showActions es false
    test('applies padding when showActions is false', () => {
        render(
            <FeedbackDialog 
                message="Padding test" 
                onClose={() => {}} 
                showActions={false} 
            />
        );
        const typography = screen.getByText('Padding test');
        expect(typography).toHaveStyle('padding-bottom: 20px');
    });
    // Verifica que el padding-bottom sea 0 cuando showActions es true
    test('does not apply padding when showActions is true', () => {
        render(
            <FeedbackDialog 
                message="Padding test" 
                onClose={() => {}} 
                onConfirm={() => {}} 
                showActions={true} 
            />
        );
        const typography = screen.getByText('Padding test');
        expect(typography).toHaveStyle('padding-bottom: 0');
    });
});
