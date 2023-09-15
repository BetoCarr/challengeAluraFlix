import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Box from '@mui/material/Box';

// const StyleDefaultPage = styled.div`
//     width: 100%; 
//     margin: 0 auto; 
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
// `
function DefaultPage ({ children }) {
    return(
        <Box sx={{
                width: "100%",
                margin: "0 auto",
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Header />
                {children}
            <Footer />
        </Box>
    );
}

export default DefaultPage;