// Importación de React y componentes
import './MenuCategory.css';
import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu  from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteCategoryMenuItem from './DeleteCategoryMenuItem';
import EditCategroyMenuItem from './EditCategoryMenuItem';
import AddVideoMenuItem from './AddVideoMenuItem';

const StyledMenu = styled((props) => (
    // Estiliza el componente Menu de Material-UI y hereda las props
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
        // Estilos para el contenedor del menú
        borderRadius: 6,        
        minWidth: 180,
        width:200,
        backgroundColor: theme.palette.categorymenu.primary, // Cambia el color de fondo del menú
        color: theme.palette.text.primary, // Cambia el color de texto del menú
        // Otros estilos que desees aplicar al menú
    },
    '& .MuiMenuItem-root': {
        // Estilos para los elementos del menú
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
function MenuCategory ({ categoryId }) {

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

    // Retorna un conjunto de componentes: un botón de menú y el menú desplegable
    return (
        <>
            {/* Botón de menú con el icono de flecha hacia abajo */}
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
                <DeleteCategoryMenuItem 
                    categoryId={categoryId} 
                    handleClose={handleClose}
                />
                {/* Elemento de menú para la opción "Editar" */}
                <EditCategroyMenuItem 
                    categoryId={categoryId} 
                    handleClose={handleClose}
                />
                {/* Elemento de menú para la opción "Agregar video" */}
                <AddVideoMenuItem 
                    categoryId={categoryId} 
                    // categoryName={categoryName}
                    handleClose={handleClose}
                />
            </StyledMenu>
        </>
    );
}

// Exporta el componente MenuCategory para su uso en otras partes de la aplicación
export default MenuCategory;