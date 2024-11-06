import React from "react";
import FormNuevoVideo from "../FormNuevoVideo/FormNuevoVideo";

function FormEditarVideo({ categoryId }) {
    return (
        <>
            <FormNuevoVideo 
                isEditing={true}
                categoryId={categoryId}
            />
        </>
    )
}

export default FormEditarVideo;