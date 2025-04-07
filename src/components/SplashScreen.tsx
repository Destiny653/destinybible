import { useState, useEffect } from 'react';
import '../styles/SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Fade in content after a short delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Show buttons after content has faded in
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-overlay"></div>
      <div className="divine-rays"></div>
      <div className="divine-image"></div>
      <div className={`splash-content ${showContent ? 'visible' : ''}`}>
        <h1>Destiny Bible</h1>
        <p className="splash-subtitle">Explore the Word of God</p>
        <p className="splash-description">
          "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart."
          <span className="verse-reference">— Hebrews 4:12</span>
        </p>
        
        <div className={`splash-buttons ${showButtons ? 'visible' : ''}`}>
          <button 
            className="splash-button primary"
            onClick={onComplete}
          >
            Explore Now
          </button>
          <button 
            className="splash-button secondary"
            onClick={onComplete}
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="splash-attribution">
        Divine Light - Inspiring Faith Through Scripture
      </div>
    </div>
  );
};

export default SplashScreen;
