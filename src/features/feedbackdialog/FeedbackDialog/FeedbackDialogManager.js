import { useFeedback } from "../feedBackDialogContext"
import FeedbackDialog  from "./FeedbackDialog"

const FeedbackLookup = {
    FeedbackDialog: FeedbackDialog
}

function FeedbackDialogManager() {

    const { feedback, closeFeedback } = useFeedback()
    if(!feedback) return null

    const Feedback = FeedbackLookup[feedback.name]
    console.log(Feedback)

    return <Feedback onClose={closeFeedback} {...feedback.props}/>
}

export default FeedbackDialogManager;