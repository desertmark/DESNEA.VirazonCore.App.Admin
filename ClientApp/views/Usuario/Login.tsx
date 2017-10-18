import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
//
import LoginForm from '../../components/Usuario/Login/LoginForm';
import { ApplicationState } from "ClientApp/store";
import { actionCreators } from "../../containers/Layout/actions";

class Login extends React.Component<any, any> {
    componentDidUpdate() {
        this.props.isAuthenticated();
    }
    public render() {
        if (this.props.layout.isAuthenticated)
            return <Redirect to='/' />;
        return <div>
            <h2>Ingresar</h2>
            <div className="col-sm-8">
                <LoginForm />
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.Layout,
        }
    },
    (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Login) as typeof Login;
