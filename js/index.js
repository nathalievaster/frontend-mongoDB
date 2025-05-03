// Vänta tills hela sidan är laddad
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("work-list");
  
    // Funktion för att hämta och visa data
    async function fetchExperiences() {
      try {
        const response = await fetch("http://localhost:3000/experiences");
        const experiences = await response.json();
  
        list.innerHTML = ""; // Töm listan
  
        // Gå igenom varje erfarenhet och skapa list-element
        experiences.forEach(exp => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${exp.company}</strong> – ${exp.position}<br>
            ${new Date(exp.startDate).toLocaleDateString()} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Pågående"}<br>
            <em>${exp.description}</em>
          `;
  
          // Skapa och lägg till delete-knappen
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Radera";
          deleteBtn.classList.add("delete-btn");

  
          deleteBtn.addEventListener("click", async () => {
            if (confirm("Är du säker på att du vill radera posten?")) {
              try {
                const delResponse = await fetch(`http://localhost:3000/experiences/${exp._id}`, {
                  method: "DELETE"
                });
                if (!delResponse.ok) throw new Error("Kunde inte radera posten");
                fetchExperiences(); // Uppdatera listan efter radering
              } catch (err) {
                console.error("Fel vid radering:", err);
                alert("Något gick fel vid radering.");
              }
            }
          });
  
          li.appendChild(deleteBtn);
          list.appendChild(li);
        });
  
      } catch (error) {
        console.error("Kunde inte hämta data:", error);
        list.innerHTML = "<li>Kunde inte ladda data</li>";
      }
    }
  
    fetchExperiences(); // Kör funktionen direkt
  });
  