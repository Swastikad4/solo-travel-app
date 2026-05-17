import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Home() {
  const [place, setPlace] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const onScroll = () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/api/destinations`)
      .then((res) => { setDestinations(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    if (place.trim()) navigate(`/destination/${place.trim().toLowerCase()}`);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Solo<span className="accent">Travel</span>
        </div>
        <div className="navbar-center">
          <a href="#destinations">Destinations</a>
          <a href="#destinations">Explore</a>
          <Link to="/plan">Trips</Link>
        </div>
        <Link to="/plan" className="btn-cta">Plan a Trip ✈</Link>
      </nav>

      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80" alt="Travel landscape" />
        </div>
        <div className="hero-content">
          <h1>Explore your<br /><span className="accent-text">place to travel</span></h1>
          <p className="hero-subtitle">Discover stunning destinations, connect with fellow solo travelers, and create memories that last a lifetime.</p>
          <div className="search-bar" role="search">
            <div className="search-field">
              <span className="field-icon">🔍</span>
              <input
                type="text"
                placeholder="Where to? (e.g. Paris, Tokyo)"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                aria-label="Search destination"
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-field" style={{ flex: "0 0 auto" }}>
              <span className="field-icon">📅</span>
              <span style={{ color: "#808080", fontSize: "0.88rem" }}>Anytime</span>
            </div>
            <div className="search-divider"></div>
            <div className="search-field" style={{ flex: "0 0 auto" }}>
              <span className="field-icon">👤</span>
              <span style={{ color: "#808080", fontSize: "0.88rem" }}>Solo</span>
            </div>
            <button className="search-btn-main" onClick={handleSearch}>Explore</button>
          </div>
          <div className="search-suggestions">
            {["Paris", "Tokyo", "Bali", "London", "Bangkok", "Iceland"].map((s) => (
              <button key={s} className="suggestion-chip" onClick={() => navigate(`/destination/${s.toLowerCase()}`)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="hero-promo">
          <h3>We provide a variety of the best solo travel experiences for those who seek it.</h3>
          <p>Don't worry about the journey. We've got you covered.</p>
        </div>
      </section>

      <section className="section" id="destinations">
        <div className="section-header">
          <p className="section-label">Popular Destinations</p>
          <h2 className="section-title">Where Will You Go?</h2>
          <p className="section-subtitle">Hand-picked destinations perfect for solo explorers, rated by safety, budget, and overall solo experience.</p>
        </div>
        {loading ? (
          <div className="loading"><div className="spinner"></div><p className="loading-text">Loading destinations...</p></div>
        ) : (
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="dest-card"
                onClick={() => navigate(`/destination/${dest.name.toLowerCase()}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/destination/${dest.name.toLowerCase()}`)}
                aria-label={`Explore ${dest.name}`}
              >
                <div className="dest-card-img-wrapper">
                  <img className="dest-card-img" src={dest.image} alt={dest.name} loading="lazy" />
                  {dest.soloScore && <div className="dest-card-solo-score">⭐ {dest.soloScore} Solo Score</div>}
                </div>
                <div className="dest-card-body">
                  <h3 className="dest-card-name">{dest.name}</h3>
                  <p className="dest-card-desc">{dest.description}</p>
                  <div className="dest-card-meta">
                    {dest.avgBudget && <span className="dest-card-meta-item"><span className="icon">💰</span> {dest.avgBudget}</span>}
                    {dest.bestTime && <span className="dest-card-meta-item"><span className="icon">📅</span> {dest.bestTime}</span>}
                    {dest.safetyRating && <span className="dest-card-meta-item"><span className="icon">🛡️</span> {dest.safetyRating}/5</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2026 SoloTravel — Built for adventurers who explore alone, together.</p>
      </footer>
    </div>
  );
}

export default Home;