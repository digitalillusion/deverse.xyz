import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Link from "./link";
import { FormattedMessage } from "gatsby-plugin-intl";

function ListItem(props) {
    const data = props.data;
    let anchorAttrs = {
        href: data.url,
        title: data.name
    };
    return (
        <li>
            <Link to={data.url} {...anchorAttrs}>
                <span><FormattedMessage id={"footerlinks_" + data.name} /></span>
            </Link>
        </li>
    );
}

export default function() {
    const data = useStaticQuery(graphql`
        query FooterLinkQuery {
            site {
                siteMetadata {
                    footerLinks {
                        name
                        url
                    }
                }
            }
        }
    `);

    const items = data.site.siteMetadata.footerLinks;
    let list = [];

    items.forEach(function(e, i) {
        list.push(<ListItem key={e.url + "-" + i} data={e} />);
    });

    return <ul className="navbar-links">{list}</ul>;
}
