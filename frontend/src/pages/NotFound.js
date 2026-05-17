import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar scrolled">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Solo<span className="accent">Travel</span>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/plan" className="btn-plan">Plan a Trip</Link>
        </div>
      </nav>
      <div className="not-found">
        <div className="not-found-icon">404</div>
        <h2>Page Not Found</h2>
        <p>Looks like you've wandered off the map. Let's get you back on track!</p>
        <button className="search-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
      <footer className="footer">
        <p>© 2026 SoloTravel — Built for adventurers who explore alone, together.</p>
      </footer>
    </div>
  );
}

export default NotFound;
