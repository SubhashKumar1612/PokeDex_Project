import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Ensure this file is created for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Created By: Subhash Kumar</p>
                <div className="social-links">
                    <a 
                        href="https://www.instagram.com/subhashraja143" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="Instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a 
                        href="https://linkedin.com/in/subhash-kumar-902181220/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a 
                        href="https://github.com/SubhashKumar1612" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
