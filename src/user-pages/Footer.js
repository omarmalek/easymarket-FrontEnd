import React from "react";
import { social } from "../data";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
