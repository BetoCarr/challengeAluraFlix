// Importación de Reac y componentes
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Componente principal MenuCategory
function MenuCategory ({ onDelete }) {
    // Estado para gestionar la apertura y cierre del menú
    const [anchorEl, setAnchorEl] = useState(null);
    
    // Manejador de clic para abrir el menú
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Manejador para cerrar el menú
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Función para manejar la eliminación de la categoría desde el menú
    const handleMenuDelete = () => {
        handleClose(); // Cierra el menú al hacer clic en "Eliminar"
        onDelete();    // Llama a la función onDelete proporcionada por el padre
    };

    // Retorna un conjunto de componentes: un botón de menú y el menú desplegable
    return (
        <>
            {/* Botón de menú con el icono de tres puntos verticales */}
            <IconButton
                aria-label="more"
                aria-controls="menu-categoria"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            {/* Menú desplegable */}
            <Menu
                id="menu-categoria"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* Elemento de menú para la opción "Eliminar" */}
                <MenuItem onClick={handleMenuDelete}>Eliminar</MenuItem>
                {/* Puedes agregar más elementos del menú aquí */}
            </Menu>
        </>
    );
}

// Exporta el componente MenuCategory para su uso en otras partes de la aplicación
export default MenuCategory;