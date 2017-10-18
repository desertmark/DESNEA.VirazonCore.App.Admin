import * as React from 'react'
import { default as MaterialTextField } from 'material-ui/TextField';
import './Controles.css';

export const TextField = ({ input, label, meta: { touched, error }, ...props }) => {
    return (
        <div className="row">
            <div className="col-sm-4">
                <label className="field-label">{label}</label>
            </div>
            <div className="col-sm-8">
                <MaterialTextField
                    className="text-right"
                    floatingLabelText={props.floatingLabelText || label}
                    {...input}
                    {...props}
                    style={Object.assign({}, {
                        width: '100%',
                        margin: '0 auto',
                    }, props.style)}
                />
            </div>
        </div>
    );
}