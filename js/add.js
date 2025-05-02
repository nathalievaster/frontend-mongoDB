document.getElementById("work-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = ""; // Rensa gamla felmeddelanden
  
    const company = form.company.value.trim();
    const position = form.position.value.trim();
    const startDate = form.startdate.value;
    const description = form.description.value.trim();
  
    // Samla alla fel i en array
    const errors = [];

    // Felmeddelanden för att vara tydlig mot användaren
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
  
    // Om det finns fel, visa dem och stoppa POST-anropet
    if (errors.length > 0) {
      errorDiv.innerHTML = errors.map(msg => `<p>${msg}</p>`).join("");
      return;
    }
  
    // Om inga fel – skicka datan till API
    const newExperience = {
      company,
      position,
      startDate,
      endDate: form.enddate.value || null,
      description
    };
  
    try {
      const response = await fetch("http://localhost:3000/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newExperience)
      });
  
      if (!response.ok) throw new Error("Något gick fel vid sparandet.");
  
      window.location.href = "index.html"; // Navigera till startsidan
    } catch (err) {
      errorDiv.textContent = "Kunde inte spara posten. Försök igen.";
    }
  });
  