import React, { useState, useEffect } from 'react';
import { getAboutInfo } from '../services/blogService';
import ReactMarkdown from 'react-markdown';
import { FaTwitter, FaLinkedin, FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa';
import '../styles/about.css';
import Minesweeper from '../components/games/Minesweeper';
import Sidebar from '../components/common/Sidebar';

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutInfo();
        setAboutData(data);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!aboutData) {
    return <div className="error">Failed to load about information.</div>;
  }

  const { description, profileImage, socialMedia } = aboutData;

  return (
    <div className="about-page">
      <h1>Sobre Mim</h1>
      <div className="about-layout">
        <section className="about-content">
          <div className="about-image">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="about-text">
            <ReactMarkdown>{description}</ReactMarkdown>
            <h2>Contato</h2>
            <div className="social-media">
              {socialMedia.twitter && (
                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} />
                </a>
              )}
              {socialMedia.linkedin && (
                <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} />
                </a>
              )}
              {socialMedia.instagram && (
                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
              )}
              {socialMedia.discord && (
                <a href={socialMedia.discord} target="_blank" rel="noopener noreferrer">
                  <FaDiscord size={30} />
                </a>
              )}
              {socialMedia.email && (
                <a href={`mailto:${socialMedia.email}`}>
                  <FaEnvelope size={30} />
                </a>
              )}
            </div>
          </div>
          <Minesweeper rows={10} cols={10} mines={20} />
        </section>
        <Sidebar />
      </div>
    </div>
  );
}

export default About;