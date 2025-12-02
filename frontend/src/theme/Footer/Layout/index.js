import Icon from 'feather-icons-react';
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            <div className="footer__bottom-container">
              {copyright}
              <div className="footer__social-icons">
                <a href="https://github.com/panaverse" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  <Icon icon="github" size={24} />
                </a>
                <a href="https://twitter.com/Panaverse_Edu" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  <Icon icon="twitter" size={24} />
                </a>
                <a href="https://discord.gg/panaverse" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  <Icon icon="message-circle" size={24} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
