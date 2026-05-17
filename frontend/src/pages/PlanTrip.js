import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function PlanTrip() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  // Navbar scroll effect
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const onScroll = () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load destinations dynamically from API
  useEffect(() => {
    axios
      .get(`${API}/api/destinations`)
      .then((res) => setDestinations(res.data))
      .catch(() => {
        // Fallback to static list if API fails
        setDestinations([
          { name: "Paris" }, { name: "Tokyo" }, { name: "Bali" },
          { name: "London" }, { name: "Bangkok" }, { name: "Iceland" },
        ]);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.userId.trim()) return "Please enter your name or handle.";
    if (!form.destination) return "Please select a destination.";
    if (!form.startDate) return "Please select a start date.";
    if (!form.endDate) return "Please select an end date.";
    if (new Date(form.endDate) < new Date(form.startDate))
      return "End date must be on or after the start date.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/api/trips/add`, {
        ...form,
        userId: form.userId.trim(),
        destination: form.destination.trim(),
        notes: form.notes.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        navigate(`/destination/${form.destination.toLowerCase()}`);
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

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

      <div className="plan-page">
        <h1>✈️ Plan Your Solo Trip</h1>
        <p className="subtitle">Share your travel plans and connect with fellow solo explorers</p>

        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="userId">Your Name / Handle</label>
              <input
                id="userId"
                type="text"
                name="userId"
                placeholder="e.g. WanderlustAmy"
                value={form.userId}
                onChange={handleChange}
                maxLength={40}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <select
                id="destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest.name} value={dest.name}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  min={form.startDate || new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Travel Notes</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="What are you looking forward to? Want to meet fellow travelers?"
                value={form.notes}
                onChange={handleChange}
                maxLength={500}
              />
              <div className="char-count">{form.notes.length}/500</div>
            </div>

            {error && <div className="error-message">⚠️ {error}</div>}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Publishing..." : "🚀 Publish My Trip"}
            </button>
          </form>

          {success && (
            <div className="success-message">
              ✅ Trip published! Redirecting to your destination page...
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 SoloTravel — Built for adventurers who explore alone, together.</p>
      </footer>
    </div>
  );
}

export default PlanTrip;
