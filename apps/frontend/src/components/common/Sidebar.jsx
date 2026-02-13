import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGamepad, faTv, faBook } from '@fortawesome/free-solid-svg-icons';
import { getFeaturedImage, getActivities } from '../../services/blogService';
import '../../styles/sidebar.css'; // Import the external CSS file

// Add icons to the library
library.add(faGamepad, faTv, faBook);

const Sidebar = () => {
  // State for Last.fm data
  const [lastFmData, setLastFmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('')
  const [game, setGame] = useState('');
  const [tv, setTv] = useState('');
  const [book, setBook] = useState('');

  // Simulated Last.fm API call - in production, replace with actual API call
  useEffect(() => {
    const fetchLastFmData = async () => {
      try {
        const user = 'dankhael';  // Replace with the correct user
        const apiKey = 'e697ac237f9bb157ecd7b43cb86383eb';  // Replace with the correct API key
        // Fetch recent tracks from Last.fm API
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=15`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLastFmData(data.recenttracks.track);
      } catch (error) {
        console.error('Fetching Last.fm data failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadFeaturedImage = async () => {
      try {
        const image = await getFeaturedImage();
        setImageUrl(image.url);
        setImageCaption(image.caption);
      } catch (error) {
        console.error('Failed to load featured image', error);
      }
    };

    const loadActivities = async () => {
      try {
        const activitiesRequest = await getActivities();
        setGame(activitiesRequest.game);
        setTv(activitiesRequest.tv);
        setBook(activitiesRequest.book);
      } catch (error) {
        console.error('Failed to load activities:', error);
      }
    };

    fetchLastFmData();
    loadFeaturedImage();
    loadActivities();
  }, []);


  return (
    <div className="sidebar-container">
      {/* O que estou fazendo section */}
      <div className="sidebar-section">
        <h2 className="sidebar-heading">O que estou fazendo</h2>
        <div className="sidebar-content current-activity">
          <div className="activity-item">
            <div className="activity-icon">
                <FontAwesomeIcon icon="fa-solid fa-gamepad" />
            </div>
            <div className="activity-info">
              <p className="activity-title">Jogando</p>
              <p className="activity-name">{game}</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
                <FontAwesomeIcon icon="fa-solid fa-tv" />
            </div>
            <div className="activity-info">
              <p className="activity-title">Assistindo</p>
              <p className="activity-name">{tv}</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
                <FontAwesomeIcon icon="fa-solid fa-book" />
            </div>
            <div className="activity-info">
              <p className="activity-title">Lendo</p>
              <p className="activity-name">{book}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h2 className="sidebar-heading">Imagem em destaque</h2>
        <div className="sidebar-content featured-image">
          <img src={imageUrl} alt="Imagem em destaque" />
          <p className="image-caption">{imageCaption}</p>
        </div>
      </div>

      {/* Last.fm section */}
      <div className="sidebar-section">
        <h2 className="sidebar-heading">Last.FM Log</h2>
        <div className="sidebar-content lastfm-data">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="recent-tracks">
              {lastFmData && lastFmData.map((track, index) => (
                <div key={index} className="track-item">
                  <img src={track.image[1]['#text'] || 'https://lastfm.freetls.fastly.net/i/u/avatar300s/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg'} alt={track.album['#text'] || 'Album'} className="track-image" />
                  <div className="track-info">
                    <p className="track-name">{track.name}</p>
                    <p className="track-artist">{track.artist['#text']}</p>
                  </div>
                </div>
              ))}
              <div className="lastfm-attribution">
                <img src="https://cdn-icons-png.flaticon.com/512/145/145806.png" alt="Last.fm logo" className="lastfm-logo" />
                <span>via Last.fm</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// No more styles in this file, just the component export
export default Sidebar;