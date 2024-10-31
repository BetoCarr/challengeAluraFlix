import { useFeedback } from "../feedBackDialogContext"

function FeedbackDialogManager() {

    const {feedback} = useFeedback()
    console.log({ feedback })
    return null
}

export default FeedbackDialogManager;