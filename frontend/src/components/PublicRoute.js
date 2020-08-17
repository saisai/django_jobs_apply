import React from 'react';
import { Route } from 'react-router-dom';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem("token") || restricted ?
                <Component {...props} />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;