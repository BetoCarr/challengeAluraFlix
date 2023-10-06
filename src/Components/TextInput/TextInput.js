import React from "react";
import { Field, ErrorMessage } from "formik";

function TextInput ({ name, placeholder}) {
    return(
        <div className="input-container">
            <label htmlFor={name}></label>
            <Field
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                className="text-input"
            />
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    );
}

export default TextInput;
