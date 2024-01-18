// Importación de Reac y componentes
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function MenuCategory ({ onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEliminarCategoria = () => {
        // Lógica para confirmar la eliminación y llamar a la función onDelete
        if (window.confirm('¿Seguro que deseas eliminar esta categoría?')) {
            onDelete();
            handleClose();
        }
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="menu-categoria"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu-categoria"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEliminarCategoria}>Eliminar</MenuItem>
                {/* Puedes agregar más elementos del menú aquí */}
            </Menu>
        </>
    );
}

export default MenuCategory;