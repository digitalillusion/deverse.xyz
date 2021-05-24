import React from "react";
import { Link as IntlLink } from "gatsby-plugin-intl";

const Link = props => {
    if (props.to.startsWith("/")) {
        return <IntlLink {...props}>{props.children}</IntlLink>;
    }

    return (
        <a href={props.to}>
            {props.children}
        </a>
    );
};

export default Link;
