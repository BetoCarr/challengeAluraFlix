// Importación de React y componentes
import './StylesContainerTitulo.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import MenuCategory from '../MenuCategory/MenuCategory';
import { selectCategoryById } from '../../videoCategoriesSlice';

// Componente que representa un contenedor de título con un menú desplegable
function ContainerTitulo({ categoryId }) {
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, color, isBanner } = category;

    console.log(category)
    // Determina la clase de estilo basada en si es un banner o no
    const className = isBanner ? 'paper-banner' : 'paper';
    const typographyClassName = isBanner ? 'typography-banner' : 'typography';

    return(
        // Contenedor de Material-UI con sombra y color de fondo personalizado
        <Paper elevation={2} style={{backgroundColor: color}} className={className}>
            {/* Texto del título con estilo de encabezado h4 */}
            <Typography variant='h4' className={typographyClassName}>
                {nombre}
            </Typography>
            {/* Componente del menú desplegable para acciones en la categoría */}
            {/* <MenuCategory
                categoryId={categoryId}
                categoryName={categoryName}
                categoryColor={color}
                isBanner={isBanner}
            /> */}
        </Paper>
    );
}

// Exporta el componente ContainerTitulo para su uso en otras partes de la aplicación
export default ContainerTitulo;
