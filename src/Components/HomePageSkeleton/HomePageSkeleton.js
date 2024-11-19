// Importación de React y componentes
import React from 'react';
import './HomePageSkeleton.css'
import { Skeleton, Box, Grid } from '@mui/material';

// Componente para mostrar un esqueleto de carga en la página Home
function HomePageSkeleton() {
    return (
        // Contenedor principal del esqueleto
        <Box  className='skeleton-container'>
            {/* Contenedor para el título y el contenido principal */}
            <Box className='title-container'>  
                {/* Contenido del lado izquierdo (título y descripción) */}
                <Box className='left-content'>
                    <Skeleton variant="rectangular" width="45%" height={70} sx={{ marginBottom: '16px' }} />
                    <Skeleton variant="rectangular" width="95%" height={100} sx={{ marginBottom: '16px' }} />
                </Box>
                {/* Contenido del lado derecho (elemento destacado, por ejemplo, imagen o banner) */}
                <Box className='right-content'>
                    <Skeleton variant="rectangular" width="100%" height={280} sx={{ marginBottom: '16px' }} />
                </Box>
            </Box>
            {/* Contenedor para las tarjetas (videos o contenido relacionado) */}
            <Box className='cards-container'>
                <Grid container spacing={2}>
                    {[1, 2, 3].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton 
                                variant="rectangular" 
                                width="100%" 
                                height={250} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>        
        </Box>
    );
}

export default HomePageSkeleton;
