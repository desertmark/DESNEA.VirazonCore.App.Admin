//LIBS
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
//CUSTOM
import { actionCreators } from './actions';
import Header from '../Header/Header';
import './Layout.css';
//MATERIAL
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper'
import { ApplicationState } from "ClientApp/store";

class LayoutConnector extends React.Component<any, any> {
    componentWillMount() {
        this.props.isAuthenticated();
    }

    componentDidUpdate() {
        if (!this.props.isAthenticated) {
            this.props.push('/login');
        }
    }

    public render() {
        return (
            <div></div>
            )
    }
}
export default connect(
    (state: ApplicationState) => state.Layout,
    (dispatch) => bindActionCreators(Object.assign({},
        actionCreators,
        { push }), dispatch)
)(LayoutConnector) as typeof LayoutConnector;

