/* 
==========================================
 Author and Co-Authors: Faiyaz Rahman
 Last updated: 27 SEP 2021 9:42 PM
==========================================
*/

import React from "react";
import { version } from "../config";

const Footer = () => {
    let style = {
        marginTop: "10vh",
        padding: "1rem",
        color: "aliceblue",
        backgroundColor: "#2791ff",
        position: "fixed",
        bottom: "0",
        height: "100px",
        width: "100%",
        textAlign: "center",
    }

    return (
        <div style={style} className="footer">
            <p><b>&copy; WeRware Pty Ltd 2020-2021&nbsp;&nbsp;</b>
                <i>SwapStreet is a software engineering team project in Comp4050 S2 2021, Macqurie University
                </i></p>
            <p>Version ~ {version}</p>
        </div>
    );
}

export default Footer;