/* 
==========================================
 Author and Co-Authors: Faiyaz Rahman
 Last updated: 27 SEP 2021 9:42 PM
==========================================
*/

import React from "react";
import { version } from "../config";

const Footer = () => (
  <div className="footer">
    <p><b>&copy; WeRware Pty Ltd 2020-2021&nbsp;&nbsp;</b>
      <i>SwapStreet is a software engineering team project in Comp4050 S2 2021, Macqurie University
    </i></p>
    <p>Version ~ {version}</p>
  </div>
);

export default Footer;