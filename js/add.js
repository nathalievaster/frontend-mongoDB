// Lyssna på formulärets submit-händelse
document.getElementById("work-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Förhindra att formuläret skickas på vanligt sätt (laddar om sidan)
  
    const form = event.target; // Hämtar själva formulärobjektet
    const errorDiv = document.getElementById("error-message"); // Hämtar elementet där felmeddelanden ska visas
    errorDiv.innerHTML = ""; // Rensar tidigare felmeddelanden innan ny validering
  
    // Hämtar värden från formuläret och trimmar bort överflödiga mellanslag
    const company = form.company.value.trim();
    const position = form.position.value.trim();
    const startDate = form.startdate.value;
    const description = form.description.value.trim();
  
    // Array som samlar alla fel som hittas vid validering
    const errors = [];
  
    // Validering – kolla att alla obligatoriska fält är ifyllda
    if (!company) {
      errors.push("Du måste fylla i företagsnamn.");
    }
  
    if (!position) {
      errors.push("Du måste fylla i jobbtitel.");
    }
  
    if (!startDate) {
      errors.push("Du måste fylla i startdatum.");
    }
  
    if (!description) {
      errors.push("Du måste fylla i en beskrivning.");
    }
  
    // Om det finns några fel – visa dem i HTML och avsluta funktionen
    if (errors.length > 0) {
      errorDiv.innerHTML = errors.map(msg => `<p>${msg}</p>`).join(""); // Skapa ett <p>-element för varje felmeddelande
      return;
    }
  
    // Om allt är korrekt – bygg upp ett objekt med datan som ska skickas
    const newExperience = {
      company,
      position,
      startDate,
      endDate: form.enddate.value || null, // Om slutdatum inte är ifyllt, skicka null
      description
    };
  
    // Skicka datan till din REST-webbtjänst via fetch (POST)
    try {
      const response = await fetch("http://localhost:3000/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExperience) // Gör om objektet till JSON
      });
  
      if (!response.ok) throw new Error("Något gick fel vid sparandet.");
  
      window.location.href = "index.html"; // Skicka användaren tillbaka till startsidan om allt gick bra
    } catch (err) {
      errorDiv.textContent = "Kunde inte spara posten. Försök igen."; // Visar felmeddelande vid nätverksproblem
    }
  });
  