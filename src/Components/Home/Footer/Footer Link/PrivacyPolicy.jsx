import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '24px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.7',
   
                        borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Privacy Policy</h2>
            <p>
                We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Information Collection</h3>
            <p>
                We may collect personal information such as your name, email address, and usage data when you interact with our site or services.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Use of Information</h3>
            <p>
                The information we collect is used to provide, maintain, and improve our services, as well as to communicate with you and ensure website security.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Data Protection</h3>
            <p>
                We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Cookies</h3>
            <p>
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Third-Party Services</h3>
            <p>
                We may use third-party services that have their own privacy policies. We encourage you to review those policies when using such services.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Changes to This Policy</h3>
            <p>
                We may update our Privacy Policy from time to time. Any changes will be posted on this page.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>Contact Us</h3>
            <p>
                If you have any questions about our Privacy Policy, please contact us through our website.
            </p>
            <style>
                {`
                    @media (max-width: 600px) {
                        div[style] {
                            padding: 12px !important;
                        }
                        h2[style] {
                            font-size: 1.3rem !important;
                        }
                        h3[style] {
                            font-size: 1rem !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PrivacyPolicy;