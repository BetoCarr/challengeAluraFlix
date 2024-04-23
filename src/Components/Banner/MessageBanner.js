// Importacion de React y componentes
import React from 'react';
import Typography from '@mui/material/Typography';

// Componente mesaje en Banner
function MessageBanner () {
    return(
        <>
            {/* Mensaje de invitación a explorar deportes */}
            <Typography variant='h4' color='text.primary'>
                Explora y Aprende Deportes
            </Typography>
            {/* Descripción de la plataforma */}
            <Typography variant='body1' color='text.primary'>
                SportFlix te invita a explorar y aprender una variedad de deportes emocionantes. Sumérgete en el mundo del deporte, desde el longboarding hasta el fútbol y el frontenis. Nuestra plataforma está diseñada para ayudarte a adquirir nuevas habilidades y conocimientos deportivos mientras te diviertes. ¡Unete a la aventura deportiva ahora!
            </Typography>
        </>

    );
}

// Exportacion de componente
export default MessageBanner;