import {useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyle = {
    transform: `translate(${-mouseX / 50}px, ${-mouseY / 50}px)`,
  };

  return (
    <header className="hero-banner">
      <div className="parallax-container" style={parallaxStyle}></div>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Physical AI & Humanoid Robotics
        </Heading>
        <p className="hero__subtitle">Master embodied intelligence with hands-on labs</p>
        <Heading as="h2" className="hero-text-center">Building the Future of Embodied Intelligence</Heading>
        <div style={{textAlign: 'center', marginTop: '60px'}}>
          <Link to="/docs/introduction" className="button button--primary button--lg" style={{background: 'linear-gradient(90deg, #00ffff, #8a2be2)', padding: '18px 48px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.3rem', border: 'none', boxShadow: '0 0 30px rgba(138, 43, 226, 0.6)'}}>
            Start Your Physical AI Journey →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
