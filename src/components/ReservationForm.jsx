import { createSignal, createMemo, For } from "solid-js";
import emailjs from "@emailjs/browser";

function ReservationForm(props) {
  const [bookingDate, setBookingDate] = createSignal("");
  const [bookingTime, setBookingTime] = createSignal("");
  const [bookingService, setBookingService] = createSignal("");
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const [isSending, setIsSending] = createSignal(false);

  // Calcolo dinamico degli orari in base al giorno della settimana scelto
  const availableTimeSlots = createMemo(() => {
    const date = bookingDate();
    if (!date) return { lunch: [], dinner: [], allDay: [] };

    const day = new Date(date).getDay();

    // DOMENICA (Day 0): Orario speciale domenicale continuato
    if (day === 0) {
      return {
        lunch: [],
        dinner: [],
        allDay: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"]
      };
    }
    // MARTEDÌ - SABATO: Orari standard spezzati
    return {
      lunch: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
      dinner: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
      allDay: []
    };
  });

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Gestione cambio data con validazione e reset orario
  const handleDateChange = (e) => {
    const dateVal = e.target.value;
    if (!dateVal) {
      setBookingDate("");
      setBookingTime("");
      return;
    }
    
    const day = new Date(dateVal).getDay();
    if (day === 1) { // 1 = Lunedì
      alert("Dolce Vita is closed on Mondays. Please select another day.");
      setBookingDate("");
      setBookingTime("");
      return;
    }
    
    setBookingDate(dateVal);
    setBookingTime(""); // Resetta l'orario se l'utente cambia giorno
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const restaurantMail = await emailjs.sendForm("service_4mzmr8s", "template_5sf632c", e.target, "zRfkntw9T_O_C4S43");
      const customerMail = await emailjs.sendForm("service_4mzmr8s", "template_lec527l", e.target, "zRfkntw9T_O_C4S43");

      if (restaurantMail.text === "OK" && customerMail.text === "OK") {
        setFormSubmitted(true);
        setBookingDate("");
        setBookingTime("");
        setBookingService("");
        e.target.reset();
      } else {
        alert("Ops! Something went wrong. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Connection error. Please try again or call us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section class="section-padding" id="reservation">
      <div class="container-custom">
        <div class="reservation-box" data-aos="zoom-in">
          {!formSubmitted() ? (
            <>
              <h3>Book a Table</h3>
              <p>Please select your preferred date and time slot. Please note we are closed on Mondays.<br />
              <span style="color: var(--primary); font-weight: 600;">Note: Tables are held for a maximum of 15-20 minutes and each reservation has a 2.5-hour seating limit.</span></p>
              
              <form onSubmit={handleSubmit} class="booking-form">
                <div>
                  <label for="name">Full Name *</label>
                  <input type="text" id="name" name="name" required placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label for="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="e.g. 07123 456789" />
                </div>
                <div>
                  <label for="guests">Number of Guests *</label>
                  <select id="guests" name="guests" required onChange={(e) => {
                    if(e.target.value === "11+") {
                      alert("For groups larger than 10 people, please contact the restaurant directly by phone to confirm. A deposit will be required to secure your booking.");
                    }
                  }}>
                    <option value="1">1 Person</option>
                    <option value="2" selected>2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                    <option value="7">7 People</option>
                    <option value="8">8 People</option>
                    <option value="9">9 People</option>
                    <option value="10">10 People</option>
                    <option value="11+">More than 10 People (Call Us)</option>
                  </select>
                </div>
                
                <div>
                  <label for="date">Date *</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required 
                    min={getTodayDateString()} 
                    value={bookingDate()} 
                    onChange={handleDateChange} 
                  />
                </div>

                {/* Selezione del Servizio (Pranzo o Cena) - Mostrato solo se NON è domenica */}
                {bookingDate() && availableTimeSlots().allDay.length === 0 && (
                  <div>
                    <label for="service">Service *</label>
                    <select 
                      id="service" 
                      name="service" 
                      required 
                      value={bookingService()} 
                      onChange={(e) => {
                        setBookingService(e.target.value);
                        setBookingTime(""); 
                      }}
                    >
                      <option value="" disabled selected>-- Select Lunch or Dinner --</option>
                      <option value="lunch">Lunch Service</option>
                      <option value="dinner">Dinner Service</option>
                    </select>
                  </div>
                )}

                {/* Selezione dell'Orario */}
                <div class={availableTimeSlots().allDay.length > 0 ? "form-group-full" : ""}>
                  <label for="time">Preferred Time Slot *</label>
                  <select 
                    id="time" 
                    name="time" 
                    required 
                    disabled={!bookingDate() || (availableTimeSlots().allDay.length === 0 && !bookingService())}
                    value={bookingTime()} 
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    {!bookingDate() ? (
                      <option value="" disabled selected>Please select a date first</option>
                    ) : availableTimeSlots().allDay.length > 0 ? (
                      <option value="" disabled selected>-- Select Sunday Time Slot --</option>
                    ) : !bookingService() ? (
                      <option value="" disabled selected>-- Select service first --</option>
                    ) : (
                      <option value="" disabled selected>-- Select time slot --</option>
                    )}
                    
                    {/* Se è un giorno standard ed è selezionato il Pranzo */}
                    {availableTimeSlots().allDay.length === 0 && bookingService() === "lunch" && (
                      <For each={availableTimeSlots().lunch}>{(slot) => (
                        <option value={slot}>{slot}</option>
                      )}</For>
                    )}

                    {/* Se è un giorno standard ed è selezionato la Cena */}
                    {availableTimeSlots().allDay.length === 0 && bookingService() === "dinner" && (
                      <For each={availableTimeSlots().dinner}>{(slot) => (
                        <option value={slot}>{slot}</option>
                      )}</For>
                    )}

                    {/* Se è domenica (Servizio Continuato) */}
                    {availableTimeSlots().allDay.length > 0 && (
                      <For each={availableTimeSlots().allDay}>{(slot) => (
                        <option value={slot}>{slot}</option>
                      )}</For>
                    )}
                  </select>
                </div>

                <div>
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="name@example.com" />
                </div>
                
                <div class="form-group-full">
                  <label for="notes">Special Requests / Allergies</label>
                  <textarea id="notes" name="notes" rows="3" placeholder="Let us know if you have any food allergies or seating preferences..."></textarea>
                </div>

                <div class="form-group-full text-center mt-3">
                  <button type="submit" disabled={isSending()} class="btn-primary-custom" style="width: 100%; padding: 16px 0; font-size: 1.1rem;">
                    {isSending() ? "Sending Request..." : "Submit Reservation Request"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div class="success-message" data-aos="fade-up">
              <i class="fas fa-check-circle success-icon"></i>
              <h3>Thank You!</h3>
              <p style="font-size: 1.2rem; color: #333; margin-bottom: 1rem;">Your booking request has been sent successfully.</p>
              <button class="btn-secondary-custom" onClick={() => setFormSubmitted(false)} style={{ color: "var(--primary)", "border-color": "var(--primary)", "margin-left": "0" }}>
                Book Another Table
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReservationForm;
