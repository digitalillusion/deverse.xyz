import React from "react";
import { Link as IntlLink, useIntl } from "gatsby-plugin-intl";

const Link = props => {
    let intl = useIntl();
    if (props.to.startsWith("/") && !props.to.startsWith("/" + intl.locale)) {
        return <IntlLink {...props}>{props.children}</IntlLink>;
    }

    return (
        <a href={props.to}>
            {props.children}
        </a>
    );
};

export default Link;
