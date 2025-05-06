import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
    test('should render the logo image inside the footer', () => {
        render(<Footer />);
        
        const logo = screen.getByRole('img');
        
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', expect.stringContaining('LogoMain'));
    });
});
