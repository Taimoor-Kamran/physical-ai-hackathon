import React from 'react';
export default function FooterCopyright() {
  return (
    <div
      className="footer__copyright" style={{ textAlign: 'center' }}
    >
      {`Copyright © ${new Date().getFullYear()} Panaverse DAO. Built with Docusaurus.`}
    </div>
  );
}
