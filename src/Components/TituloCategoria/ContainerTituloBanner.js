import './StylesContainerTituloBanner.css'
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuCategory from '../MenuCategory/MenuCategory';

function ContainerTituloBanner({ title, color, categoryId, categoryName, isBanner }) {
    return(
        <Paper elevation={2} style={{backgroundColor: color}} className='paper-banner'>
            <Typography variant='h4' className='typography-banner'>
                {title}
            </Typography>
              {/* Componente del menú desplegable para acciones en la categoría */}
            <MenuCategory
                categoryId={categoryId}
                categoryName={categoryName}
                categoryColor={color}
                isBanner={isBanner}
            />
        </Paper>
    );
}

export default ContainerTituloBanner;

