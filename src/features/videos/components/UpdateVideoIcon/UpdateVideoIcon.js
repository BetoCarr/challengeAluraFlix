import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useFeedback } from '../../../feedbackdialog/feedBackDialogContext'
import { useNavigate } from 'react-router-dom';

function UpdateVideoIcon ({ categoryId, videoId, title }) {
    // console.log(videoId)
    const navigate = useNavigate();

    const { openFeedback, closeFeedback } = useFeedback()

    const handleEditVideoClick = () => {
        // console.log("Quiero editar este video", videoId)
        openFeedback("FeedbackDialog", {
            message: `¿Quieres editar el video "${title}"?`,
            showActions: true,
            onConfirm: () => {
                closeFeedback()
                navigate(`/editar-video/${categoryId}/${videoId}`);
            },
        })
    }
    return(
        <EditIcon 
            onClick={handleEditVideoClick}
        />
    )
}

export default UpdateVideoIcon;