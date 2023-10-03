import './StylesContainerTitulo.css';
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function ContainerTitulo({ title, color}) {
    return(
        <Paper elevation={2} style={{backgroundColor: color}} className='paper'>
            <Typography variant='h4' className='typography'>
                {title}
            </Typography>
        </Paper>
    );
}

export default ContainerTitulo;
