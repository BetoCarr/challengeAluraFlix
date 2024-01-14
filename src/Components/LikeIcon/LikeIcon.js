import React, { useState, useEffect }  from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
import { darLikeVideo, obtenerEstadoLike } from '../../api/api';

function LikeIcon ( {videoId, title} ) {

    // Estado para manejar si el video está marcado como 'me gusta'
    const [liked, setLiked] = useState(false);
    
    // Estado para manejar si mostrar el cuadro de diálogo de feedback
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
    
    // Efecto para obtener y establecer el estado inicial de 'me gusta' al cargar el componente
    useEffect(() => {
        obtenerEstadoLike(videoId)
            .then((data) => {
                setLiked(data.liked); // Establece el estado actual de "liked" al cargar el componente
            })
            .catch((error) => {
                console.error("Error al obtener estado de 'me gusta':", error);
            });
    }, [videoId]);

    // Función para manejar el clic en el ícono de 'me gusta'
    function handleLikeClick() {
        // Invertir el estado actual de 'liked'
        const newLikeState = !liked;
        // Llamar a la API para actualizar el estado de 'me gusta' en el backend
        darLikeVideo(videoId, newLikeState)
            .then(() => {
                setLiked(newLikeState); // Actualizar el estado de 'liked'
                setFeedbackDialogOpen(true); // Mostrar el cuadro de diálogo de feedback
            })
            .catch((error) => {
                console.error(`Error al ${newLikeState ? 'dar' : 'quitar'} 'me gusta' al video:`, error);
            });
    }

    // Función para manejar el cierre del cuadro de diálogo de feedback
    function handleFeedbackDialogClose() {
        setFeedbackDialogOpen(false);
    }

    return(
        <>
            {/* Ícono de 'me gusta' con clase adicional si está marcado como 'liked' */}
            <FavoriteIcon
                className={`icon ${liked ? 'liked' : ''}`}
                onClick={handleLikeClick}
            />
            {/* Cuadro de diálogo de feedback para mostrar el resultado de dar/quitar 'me gusta' */}
            <FeedbackDialog
                isOpen={feedbackDialogOpen}
                onClose={handleFeedbackDialogClose}
                message={liked ? `¡"${title}" añadido a tus favoritos!` : `¡"${title}" eliminado de tus favoritos!`}
                onConfirm={handleFeedbackDialogClose}
            />
        </>
    );
}

export default LikeIcon;