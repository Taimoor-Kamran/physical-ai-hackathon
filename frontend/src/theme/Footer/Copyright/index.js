import React from 'react';
export default function FooterCopyright() {
  return (
    <div
      className="footer__copyright" style={{ textAlign: 'center' }}
    >
      <div className="footer-text-center">
        Physical AI & Humanoid Robotics
      </div>
      <div className="footer-text-center">
        Master embodied intelligence with hands-on labs
      </div>
      <div className="footer-text-center">
        Building the Future of Embodied Intelligence
      </div>
      <div style={{ marginTop: '1rem' }}>
        {`Copyright © ${new Date().getFullYear()} Panaverse DAO. Built with Docusaurus.`}
      </div>
    </div>
  );
}
