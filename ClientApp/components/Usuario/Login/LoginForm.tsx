import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { actionCreators } from './actions';
//import TextField from 'material-ui/TextField';
import { reduxForm, Field, Form } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import { required } from '../../Comun/Validations';
import {TextField} from '../../Comun/Controles/TextField';
import { ApplicationState } from "ClientApp/store";


class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(values) {
        this.props.login(values);
    }
    public render() {
        return(
            <div>
                {this.props.loginState.error && <span className="text-danger">{this.props.loginState.error.data}</span>}
                <Form onSubmit={this.props.handleSubmit(this.submit)}>
                    <Field
                        label="Usuario"
                        name="user"
                        component={TextField}
                        validate={required}
                    />
                    <Field
                        label="Contraseña"
                        name="password"
                        component={TextField}
                        validate={required}
                        type="password"
                    />
                    <br/>
                    <div className="text-right">
                        <RaisedButton
                            primary
                            label="Ingresar"
                            type="submit"
                        />
                    </div>
                </Form> 
            </div>
        )
    }
}

const LoginForm = new reduxForm({
    form:'LoginForm'
})(Login);

export default connect(
    (state: ApplicationState) => {
        return {
            loginState: state.LoginForm,
        }
    },
    (dispatch) => bindActionCreators(actionCreators,dispatch)
)(LoginForm) as typeof Login;
