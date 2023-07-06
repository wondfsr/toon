import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        element={
            authenticated ? (
                <Component {...rest} />
            ) : (
                <Navigate to={{ pathname: "/login", state: { from: rest.location } }} replace />
            )
        }
    />
);

export default PrivateRoute;
