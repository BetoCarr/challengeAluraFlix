import './StylesContainerTituloBanner.css'
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ContainerTituloBanner({ title, color,}) {
    return(
        <Paper elevation={2} style={{backgroundColor: color}} className='paper-banner'>
            <Typography variant='h4' className='typography-banner'>
                {title}
            </Typography>
        </Paper>
    );
}

export default ContainerTituloBanner;

