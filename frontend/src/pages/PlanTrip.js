import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000";

function PlanTrip() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/trips/add`, form);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/destination/${form.destination.toLowerCase()}`);
      }, 2000);
    } catch (err) {
      console.error("Error adding trip:", err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          🌍 <span>SoloTravel</span>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/plan" className="btn-plan">Plan a Trip</Link>
        </div>
      </nav>

      <div className="plan-page">
        <h1>✈️ Plan Your Solo Trip</h1>
        <p className="subtitle">
          Share your travel plans and connect with fellow solo explorers
        </p>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name / Handle</label>
              <input
                type="text"
                name="userId"
                placeholder="e.g. WanderlustAmy"
                value={form.userId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Destination</label>
              <select
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
              >
                <option value="">Select a destination</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Bali">Bali</option>
                <option value="London">London</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Iceland">Iceland</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Travel Notes</label>
              <textarea
                name="notes"
                placeholder="What are you looking forward to? Want to meet fellow travelers?"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              🚀 Publish My Trip
            </button>
          </form>

          {success && (
            <div className="success-message">
              ✅ Trip published! Redirecting to your destination page...
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 SoloTravel — Built for adventurers who explore alone, together.</p>
      </footer>
    </div>
  );
}

export default PlanTrip;
