import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    
    //Destructured. console.log(meta) for complete listing of object properties
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        /*

        ClassName logic ensures error field shown only after user interacts with field */
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        
        );
    };

    //Parent component calls onSubmit
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }
    
    render() {
        return (
            /*
            -Redux-form syntax handling onSubmit prop -> (handleSubmit()) 
            -Without redux-form -> onSubmit calls by way of this.onSubmit.
            #2
            Redux Form checks "name" property, then checks error object in "validate" function for identical name value.
            "validate" passes value to "renderInput" for each Field
            */
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

/* Validation checker passed to Redux Form. #1. 
Only re-renders when values are passed into errors object, otherwise returns empty object */
const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description.';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);