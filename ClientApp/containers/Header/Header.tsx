import * as React from 'react';
import Toolbar from './Toolbar'

class Header extends React.Component<{}, {}> {
    public render() {
        return <div className="col sm 12">
            <Toolbar />
        </div>;
    }
}

export default Header;