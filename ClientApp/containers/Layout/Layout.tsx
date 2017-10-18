import * as React from 'react';
import Header from '../Header/Header';
import LayoutConnector from './LayoutConnector';
//import MaterialTheme from '../MaterialTheme/MaterialTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper'
import './Layout.css';

const theme = {
    palette: {
        primary1Color: colors.blue500,
        primary2Color: colors.blue700,
        primary3Color: colors.grey400,

        accent1Color:  colors.pinkA200,
        accent2Color:  colors.grey100,
        accent3Color:  colors.grey500,
    },
}

class Layout extends React.Component<{}, {}> {
    public render() {
        return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <div>
                <LayoutConnector />
                <div className="container-fluid">
                    <Header />
                    <br /><br />
                    <div className='col-sm-2'>
                        <h1>menu</h1>
                    </div>
                    <div className='col-sm-10'>
                        <Paper className="Layout col-sm-12" zDepth={1} rounded={false}>
                            {this.props.children}
                        </Paper>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>;
    }
}
export default Layout;

