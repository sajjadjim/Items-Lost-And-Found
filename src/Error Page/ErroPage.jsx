import React from 'react';

const ErroPage = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
            color: "#fff"
        }}>
            <h1 style={{ fontSize: "6rem", margin: 0, fontWeight: "bold", letterSpacing: "2px" }}>404</h1>
            <h2 style={{ margin: "10px 0 20px 0", fontWeight: "500" }}>Page Not Found</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <a
                href="/"
                style={{
                    padding: "12px 32px",
                    background: "#fff",
                    color: "#f857a6",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "background 0.2s, color 0.2s"
                }}
                onMouseOver={e => {
                    e.target.style.background = "#f857a6";
                    e.target.style.color = "#fff";
                }}
                onMouseOut={e => {
                    e.target.style.background = "#fff";
                    e.target.style.color = "#f857a6";
                }}
            >
                Go Home
            </a>
        </div>
    );
};

export default ErroPage;