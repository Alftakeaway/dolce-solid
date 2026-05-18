import { createSignal, onMount, Show } from "solid-js";

export default function SpecialDish() {
  // ===== STATE =====
  const [isActive, setIsActive] = createSignal(false);
  const [dishName, setDishName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [price, setPrice] = createSignal("");
  const [photoUrl, setPhotoUrl] = createSignal("");
  const [saved, setSaved] = createSignal(false);
  const [showAdmin, setShowAdmin] = createSignal(false);
  const [adminPassword, setAdminPassword] = createSignal("");
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [showAdminPanel, setShowAdminPanel] = createSignal(true); onMount(() => {
  if (showAdminPanel()) setShowAdmin(true);
});
  
  // ===== LOAD DATA =====
  onMount(() => {
    const saved = localStorage.getItem("specialDish");
    if (saved) {
      const data = JSON.parse(saved);
      setIsActive(data.isActive || false);
      setDishName(data.dishName || "");
      setDescription(data.description || "");
      setPrice(data.price || "");
      setPhotoUrl(data.photoUrl || "");
    }
  });

  // ===== ADMIN FUNCTIONS =====
  const handleLogin = () => {
    if (adminPassword() === "dolce2024") {
      setIsLoggedIn(true);
      setAdminPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleSave = () => {
    const data = {
      isActive: isActive(),
      dishName: dishName(),
      description: description(),
      price: price(),
      photoUrl: photoUrl(),
    };
    localStorage.setItem("specialDish", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdmin(false);
  };

  const handleBookTable = () => {
    window.location.hash = "#reservation";
  };

  // ===== RENDER =====
  return (
    <>
      {/* CARD - Mostra se isActive() */}
      <Show when={isActive()}>
        <section style={{ padding: "100px 0", background: "#ffffff" }}>
          <div class="container-custom">
            <div style={{ "text-align": "center", "margin-bottom": "2rem" }}>
              <h2 class="section-title" style={{ "margin-bottom": "0" }}>
                Today's Speciality
              </h2>
              <p style={{ color: "#999", "font-size": "0.95rem", "margin-top": "1rem" }}>
                🔥 Limited availability – Don't miss out!
              </p>
            </div>

            <div style={{
              "background": "#ffffff",
              "border": "1px solid #e0d9ce",
              "border-radius": "4px",
              "overflow": "hidden",
              "box-shadow": "0 4px 15px rgba(0,0,0,0.08)",
              "max-width": "800px",
              "margin": "0 auto",
              "display": "grid",
              "grid-template-columns": "1fr 1fr",
              "gap": "0"
            }}>
              {/* Photo */}
              <div style={{
                "width": "100%",
                "height": "100%",
                "min-height": "400px",
                "overflow": "hidden",
                "background": "#f0f0f0"
              }}>
                <img
                  src={photoUrl()}
                  alt={dishName()}
                  style={{
                    "width": "100%",
                    "height": "100%",
                    "object-fit": "cover"
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x400?text=Special+Dish";
                  }}
                />
              </div>

              {/* Content */}
              <div style={{
                "padding": "2.5rem",
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center"
              }}>
                <h3 style={{
                  "font-family": "'Playfair Display', serif",
                  "font-size": "1.8rem",
                  "color": "#8B0000",
                  "margin-bottom": "1rem",
                  "font-weight": "700"
                }}>
                  {dishName()}
                </h3>

                <p style={{
                  "color": "#555",
                  "font-size": "0.95rem",
                  "line-height": "1.7",
                  "margin-bottom": "1.5rem"
                }}>
                  {description()}
                </p>

                <p style={{
                  "font-family": "'Playfair Display', serif",
                  "font-size": "1.4rem",
                  "color": "#C9A961",
                  "font-weight": "700",
                  "margin-bottom": "2rem"
                }}>
                  £{price()}
                </p>

                <button
                  onClick={handleBookTable}
                  style={{
                    "background": "#8B0000",
                    "color": "white",
                    "padding": "12px 28px",
                    "border": "none",
                    "border-radius": "4px",
                    "font-weight": "600",
                    "cursor": "pointer",
                    "transition": "all 0.3s",
                    "font-size": "0.95rem",
                    "width": "fit-content"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#6b0000";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#8B0000";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </section>
      </Show>

      {/* ADMIN PANEL - Mostra solo se showAdminPanel è true */}
      <Show when={showAdminPanel()}>
        
        {/* Login Modal */}
        <Show when={showAdmin() && !isLoggedIn()}>
          <div style={{
            "position": "fixed",
            "bottom": "20px",
            "right": "20px",
            "background": "#2a2a2a",
            "padding": "1.5rem",
            "border-radius": "8px",
            "box-shadow": "0 4px 20px rgba(0,0,0,0.3)",
            "z-index": "2000",
            "width": "280px"
          }}>
            <h4 style={{ color: "#C9A961", "margin-bottom": "1rem" }}>Admin Login</h4>
            <input
              type="password"
              placeholder="Password"
              value={adminPassword()}
              onInput={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              style={{
                "width": "100%",
                "padding": "0.75rem",
                "border": "1px solid #444",
                "border-radius": "4px",
                "background": "#333",
                "color": "white",
                "margin-bottom": "0.5rem"
              }}
            />
            <button
              onClick={handleLogin}
              style={{
                "width": "100%",
                "padding": "0.75rem",
                "background": "#8B0000",
                "color": "white",
                "border": "none",
                "border-radius": "4px",
                "cursor": "pointer",
                "font-weight": "600"
              }}
            >
              Login
            </button>
          </div>
        </Show>

        {/* Admin Panel */}
        <Show when={isLoggedIn()}>
          <div style={{
            "position": "fixed",
            "bottom": "20px",
            "right": "20px",
            "background": "#2a2a2a",
            "padding": "2rem",
            "border-radius": "8px",
            "box-shadow": "0 4px 30px rgba(0,0,0,0.5)",
            "z-index": "2000",
            "width": "320px",
            "max-height": "90vh",
            "overflow-y": "auto",
            "border": "2px solid #C9A961"
          }}>
            <div style={{ "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "1.5rem" }}>
              <h4 style={{ color: "#C9A961", margin: "0" }}>Today's Special</h4>
              <button
                onClick={handleLogout}
                style={{
                  "background": "transparent",
                  "color": "#C9A961",
                  "border": "none",
                  "cursor": "pointer",
                  "font-size": "1.2rem"
                }}
              >
                ✕
              </button>
            </div>

            {/* Toggle Active */}
            <div style={{ "margin-bottom": "1.5rem" }}>
              <label style={{ "display": "flex", "align-items": "center", "gap": "0.5rem", "cursor": "pointer", "color": "white" }}>
                <input
                  type="checkbox"
                  checked={isActive()}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ "width": "18px", "height": "18px" }}
                />
                <span style={{ "font-weight": "600" }}>Active Today</span>
              </label>
            </div>

            {/* Dish Name */}
            <div style={{ "margin-bottom": "1rem" }}>
              <label style={{ "display": "block", "color": "#C9A961", "font-size": "0.85rem", "margin-bottom": "0.3rem", "font-weight": "600" }}>
                Dish Name
              </label>
              <input
                type="text"
                value={dishName()}
                onInput={(e) => setDishName(e.target.value)}
                placeholder="e.g. Osso Buco"
                style={{
                  "width": "100%",
                  "padding": "0.6rem",
                  "border": "1px solid #444",
                  "border-radius": "4px",
                  "background": "#333",
                  "color": "white",
                  "font-size": "0.9rem"
                }}
              />
            </div>

            {/* Description */}
            <div style={{ "margin-bottom": "1rem" }}>
              <label style={{ "display": "block", "color": "#C9A961", "font-size": "0.85rem", "margin-bottom": "0.3rem", "font-weight": "600" }}>
                Description
              </label>
              <textarea
                value={description()}
                onInput={(e) => setDescription(e.target.value)}
                placeholder="e.g. Braised veal shanks with saffron risotto"
                style={{
                  "width": "100%",
                  "padding": "0.6rem",
                  "border": "1px solid #444",
                  "border-radius": "4px",
                  "background": "#333",
                  "color": "white",
                  "font-size": "0.9rem",
                  "min-height": "70px",
                  "resize": "vertical"
                }}
              />
            </div>

            {/* Price */}
            <div style={{ "margin-bottom": "1rem" }}>
              <label style={{ "display": "block", "color": "#C9A961", "font-size": "0.85rem", "margin-bottom": "0.3rem", "font-weight": "600" }}>
                Price (£)
              </label>
              <input
                type="number"
                value={price()}
                onInput={(e) => setPrice(e.target.value)}
                placeholder="16.50"
                step="0.01"
                style={{
                  "width": "100%",
                  "padding": "0.6rem",
                  "border": "1px solid #444",
                  "border-radius": "4px",
                  "background": "#333",
                  "color": "white",
                  "font-size": "0.9rem"
                }}
              />
            </div>

            {/* Photo URL */}
            <div style={{ "margin-bottom": "1.5rem" }}>
              <label style={{ "display": "block", "color": "#C9A961", "font-size": "0.85rem", "margin-bottom": "0.3rem", "font-weight": "600" }}>
                Photo URL (jsdelivr)
              </label>
              <input
                type="text"
                value={photoUrl()}
                onInput={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://cdn.jsdelivr.net/gh/..."
                style={{
                  "width": "100%",
                  "padding": "0.6rem",
                  "border": "1px solid #444",
                  "border-radius": "4px",
                  "background": "#333",
                  "color": "white",
                  "font-size": "0.75rem"
                }}
              />
              <p style={{ "font-size": "0.75rem", "color": "#999", "margin-top": "0.3rem" }}>
                📸 Copy from jsdelivr CDN
              </p>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              style={{
                "width": "100%",
                "padding": "0.8rem",
                "background": "#8B0000",
                "color": "white",
                "border": "none",
                "border-radius": "4px",
                "font-weight": "600",
                "cursor": "pointer",
                "margin-bottom": "0.5rem"
              }}
            >
              Save
            </button>

            {/* Success Message */}
            <Show when={saved()}>
              <div style={{
                "padding": "0.6rem",
                "background": "#2e7d32",
                "color": "white",
                "border-radius": "4px",
                "text-align": "center",
                "font-size": "0.85rem"
              }}>
                ✓ Saved!
              </div>
            </Show>
          </div>
        </Show>

      </Show>
    </>
  );
}