// Vänta tills hela sidan är laddad
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("work-list");
  
    // Funktion för att hämta och visa data
    async function fetchExperiences() {
      try {
        const response = await fetch("http://localhost:3000/experiences");
        const experiences = await response.json();
  
        // Töm listan först
        list.innerHTML = "";
  
        // Gå igenom varje erfarenhet och skapa list-element
        experiences.forEach(exp => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${exp.company}</strong> – ${exp.position}<br>
            ${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Pågående"}<br>
            <em>${exp.description}</em>
          `;
          list.appendChild(li);
        });
  
      } catch (error) {
        console.error("Kunde inte hämta data:", error);
        list.innerHTML = "<li>Kunde inte ladda data</li>";
      }
    }
  
    fetchExperiences(); // Kör funktionen direkt
  });