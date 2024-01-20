// Importación de Reac y componentes
// import './MenuCategory.css'
import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu  from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        width:100,
        backgroundColor: theme.palette.primary.main, // Cambia el color de fondo del menú
        color: theme.palette.text.primary, // Cambia el color de texto del menú
        // Otros estilos que desees aplicar al menú
    },
    '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
        },
    '&:active': {
        backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
        ),
    },
      // Otros estilos que desees aplicar a los elementos del menú
    },
}));


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
                className='menu-icon-button'
                aria-label="more"
                aria-controls="menu-categoria"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <KeyboardArrowDownIcon />
            </IconButton>
            {/* Menú desplegable */}
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* Elemento de menú para la opción "Eliminar" */}
                <MenuItem className='menu-item' onClick={handleMenuDelete}>
                    <DeleteForeverIcon color="primary" fontSize='large'/>
                    Eliminar
                </MenuItem>
                {/* Puedes agregar más elementos del menú aquí */}
            </StyledMenu>
        </>
    );
}

// Exporta el componente MenuCategory para su uso en otras partes de la aplicación
export default MenuCategory;