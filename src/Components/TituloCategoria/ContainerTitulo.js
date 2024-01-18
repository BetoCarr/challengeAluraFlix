import './StylesContainerTitulo.css';
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuCategory from '../MenuCategory/MenuCategory';

function ContainerTitulo({ title, color, onDelete}) {
    return(
        <Paper elevation={2} style={{backgroundColor: color}} className='paper'>
            <Typography variant='h4' className='typography'>
                {title}
            </Typography>
            <MenuCategory onDelete={onDelete}/>
        </Paper>
    );
}

export default ContainerTitulo;
