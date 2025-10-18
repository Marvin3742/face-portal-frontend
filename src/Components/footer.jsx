import "../css/footer.css"


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="portal.png" alt="Face Portal Logo" className="footer-logo-img" />
                    <span className="footer-logo-text">Face Portal</span>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-copyright">
                    © 2025 Face Portal. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer