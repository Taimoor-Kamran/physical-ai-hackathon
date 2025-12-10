import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
// import {useBaseUrlUtils} from '@docusaurus/useBaseUrl'; // No longer needed
// import ThemedImage from '@theme/ThemedImage'; // No longer needed
import styles from './styles.module.css';

function LogoImage({
  logo
}) {
  // const {withBaseUrl} = useBaseUrlUtils(); // No longer needed
  // const sources = {
  //   light: withBaseUrl(logo.src),
  //   dark: withBaseUrl(logo.srcDark ?? logo.src),
  // };

  // Directly use img tag for Panaversity logo
  return (
    <img className={clsx('footer__logo', styles.footerLogo, logo.className)}
    alt={logo.alt || 'Panaverse DAO Logo'}
    src={'/physical-ai-hackathon/img/panaversity-logo.png'}
    width={logo.width || 160}
    height={logo.height || 51}
    />
  );
}
export default function FooterLogo({
  logo
}) {
  return logo.href ? (
    <Link href={logo.href}
    className={styles.footerLogoLink}
    target={logo.target}>
    <LogoImage logo={logo} />
    </Link>
  ) : (
    <LogoImage logo={logo} />
  );
}
