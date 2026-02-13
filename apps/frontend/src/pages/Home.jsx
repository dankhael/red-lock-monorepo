import React from 'react';
import FeaturedSection from '../components/blog/FeaturedSection';
import RecentSection from '../components/blog/RecentSection';
import Sidebar from '../components/common/Sidebar';

function Home() {
  return (
    <div className="home-page">
      <div className="body-background">
        <FeaturedSection />
        <div class="body-content"> {/* Add this container */}
          <RecentSection />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home; 