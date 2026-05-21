import { createSignal, onMount, Show } from "solid-js";

export default function SpecialDish() {
  const [isActive, setIsActive] = createSignal(false);
  const [dishName, setDishName] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [price, setPrice] = createSignal("");
  const [photoUrl, setPhotoUrl] = createSignal("");

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

  const handleBookTable = () => {
    window.location.hash = "#reservation";
  };

  return (
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
                style={{ "width": "100%", "height": "100%", "object-fit": "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x400?text=Special+Dish";
                }}
              />
            </div>

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
  );
}