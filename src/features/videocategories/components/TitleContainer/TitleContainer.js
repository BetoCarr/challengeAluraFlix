// Importación de React y componentes
import './TitleContainerStyle.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuCategory from '../MenuCategory/MenuCategory';
import { selectCategoryById } from '../../videoCategoriesSlice';

// Componente que representa un contenedor de título con un menú desplegable
function TitleContainer({ categoryId }) {

    // Obtiene categoria y propiedades de la categoria
    const category = useSelector(state => selectCategoryById(state, categoryId));
    const { nombre, color, isBanner } = category;

    // Determina la clase de estilo basada en si es un banner o no
    const paperClassName = isBanner ? 'paper-banner' : 'paper';
    const titleClassName = isBanner ? 'typography-banner' : 'typography';

    return(
        // Contenedor de Material-UI con sombra y color de fondo personalizado
        <Paper elevation={2} style={{backgroundColor: color}} className={paperClassName}>
            {/* Texto del título con estilo de encabezado h4 */}
            <Typography variant='h4' className={titleClassName}>
                {nombre}
            </Typography>
            {/* Componente del menú desplegable para acciones en la categoría */}
            <MenuCategory categoryId={categoryId} />
        </Paper>
    );
}

// Exporta el componente TitleContainer para su uso en otras partes de la aplicación
export default TitleContainer;