import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default class NotFound extends React.Component<any, any> {
    public render() {
        return <div>
            <br/>
            <div className="text-center">
                <h2>Error 404: Pagina No Encontrada</h2>
                <h3>La pagina a la que ha intentado acceder no ha podido ser encontrada.</h3>
                <h3><Link to="/">Regresar al Inicio</Link></h3>
            </div>
        </div>;
    }
}
