import re

def patch_booking_system_final():
    file_path = "App.jsx"
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Errore: Il file {file_path} non è stato trovato nella cartella corrente.")
        return

    print("Inizio patch avanzata del modulo di prenotazione...")

    # --- STEP 1: Aggiunta dello stato 'bookingService' sotto gli altri segnali ---
    old_signals = (
        '  // --- LOGICA PRENOTAZIONI ---\n'
        '  const [bookingDate, setBookingDate] = createSignal("");\n'
        '  const [bookingTime, setBookingTime] = createSignal("");'
    )
    new_signals = (
        '  // --- LOGICA PRENOTAZIONI ---\n'
        '  const [bookingDate, setBookingDate] = createSignal("");\n'
        '  const [bookingTime, setBookingTime] = createSignal("");\n'
        '  const [bookingService, setBookingService] = createSignal("");'
    )

    if old_signals in content:
        content = content.replace(old_signals, new_signals)
        print("[OK] Aggiunto il segnale reattivo 'bookingService'.")
    elif 'bookingService' in content:
        print("[INFO] Il segnale 'bookingService' è già presente.")
    else:
        print("[ERRORE] Impossibile mappare i segnali reattivi originari.")
        return

    # --- STEP 2: Aggiornamento del reset dello stato dentro handleSubmit ---
    old_reset = (
        '        setFormSubmitted(true);\n'
        '        setBookingDate("");\n'
        '        setBookingTime("");'
    )
    new_reset = (
        '        setFormSubmitted(true);\n'
        '        setBookingDate("");\n'
        '        setBookingTime("");\n'
        '        setBookingService("");'
    )

    if old_reset in content:
        content = content.replace(old_reset, new_reset)
        print("[OK] Aggiornata la funzione handleSubmit.")

    # --- STEP 3: Sostituzione mirata del blocco JSX dell'orario ---
    old_jsx_pattern = r'<div class="form-group-full">\s*<label for="time">Preferred Time Slot \*</label>.*?<\/select>\s*<\/div>'
    
    new_jsx = """{/* Selezione del Servizio (Pranzo o Cena) - Mostrato solo se NON è domenica */}
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
                  </div>"""

    if re.search(old_jsx_pattern, content, re.DOTALL):
        content = re.sub(old_jsx_pattern, new_jsx, content, count=1, flags=re.DOTALL)
        print("[OK] Interfaccia del modulo (JSX) aggiornata con logica condizionale ed elegante.")
    else:
        if "bookingService() ===" in content:
            print("[INFO] L'interfaccia JSX risulta già modificata.")
        else:
            print("[ERRORE] Impossibile trovare la struttura originale del select orari nel JSX.")
            return

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("\n[COMPLETATO] Patch applicata con successo! Ora puoi testare il form.")

if __name__ == "__main__":
    patch_booking_system_final()