import * as React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class ToolbarWrapper extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }
    public render() {
        return <Toolbar>
            <ToolbarGroup firstChild={true}>
                <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.setState({ value })}>
                    <MenuItem value={1} primaryText="Option 1" />
                    <MenuItem value={2} primaryText="Option 2" />
                </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarTitle text="Virazon Admin" />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
                {/*<RaisedButton label="Create Broadcast" primary={true} />*/}
                <IconMenu
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>
                    }
                >
                    <MenuItem primaryText="Option 1" />
                    <MenuItem primaryText="Option 2" />
                </IconMenu>
            </ToolbarGroup>
        </Toolbar>
    }
}
export default ToolbarWrapper;

