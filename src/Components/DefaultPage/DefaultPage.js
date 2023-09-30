import './StylesDefaultPage.css';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';

function DefaultPage ({ children }) {
    return(
        <Box className='default-page'>
            <Header />
                {children}
            <Footer />
        </Box>
    );
}

export default DefaultPage;