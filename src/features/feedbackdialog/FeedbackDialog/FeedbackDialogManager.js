// import React from "react";
// import { useFeedback } from "../feedBackDialogContext"
// import FeedbackDialog  from "./FeedbackDialog"

// const FeedbackLookup = {
//     FeedbackDialog: FeedbackDialog
// }

// function FeedbackDialogManager() {

//     const { feedback, closeFeedback } = useFeedback()

//     if(!feedback) return null

//     const Feedback = FeedbackLookup[feedback.name]

//     return <Feedback onClose={closeFeedback} {...feedback.props}/>
// }

// export default FeedbackDialogManager;

import React from "react";
import { useFeedback } from "../feedBackDialogContext"
import FeedbackDialog from "./FeedbackDialog";

const FeedbackLookup = {
    FeedbackDialog: FeedbackDialog,
};

function FeedbackDialogManager() {
    const { feedback, closeFeedback } = useFeedback();

    if (!feedback) return null;

    const { name, props } = feedback;
    const FeedbackComponent = FeedbackLookup[name];

    if (!FeedbackComponent) {
        console.error(`El componente "${name}" no está registrado en FeedbackLookup.`);
        return null;
    }

    return (
        <FeedbackComponent
            {...props}
            onClose={() => {
                closeFeedback();
                props.onCloseCallback?.();
            }}
        />
    );
}

export default FeedbackDialogManager;