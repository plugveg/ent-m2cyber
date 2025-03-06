import React, { useState, useEffect } from "react";
import eventsData from "../data/events.json"; // Import des événements

export default function Planning() {
  const [selectedMonth, setSelectedMonth] = useState("Avril");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "Lundi",
    hour: "08",
    duration: "1",
    month: "Avril",
    year: "2025",
  });

  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

  useEffect(() => {
    const filteredEvents = eventsData.events.filter(event => 
      event.month === selectedMonth && event.year === selectedYear
    );
    setEvents(filteredEvents);
  }, [selectedMonth, selectedYear]);

  // Fonction pour ajouter un nouvel événement
  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setNewEvent({ title: "", day: "Lundi", hour: "08", duration: "1", month: selectedMonth, year: selectedYear });
  };

  return (
    <div style={{ display: "flex", flexGrow: 1, backgroundColor: "#2c2f33", color: "white", overflow: "hidden" }}>
      
      {/* Section d'ajout d'événements */}
      <div style={eventInputStyle}>
        <h3>Ajouter un événement</h3>
        <input type="text" placeholder="Titre de l'événement" value={newEvent.title} 
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} style={inputStyle} />

        <select value={newEvent.day} onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })} style={selectStyle}>
          {days.map((day) => <option key={day} value={day}>{day}</option>)}
        </select>

        <select value={newEvent.hour} onChange={(e) => setNewEvent({ ...newEvent, hour: e.target.value })} style={selectStyle}>
          {hours.map((hour) => <option key={hour} value={hour}>{hour}:00</option>)}
        </select>

        <select value={newEvent.duration} onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })} style={selectStyle}>
          {[...Array(6)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}h</option>)}
        </select>

        <button onClick={handleAddEvent} style={buttonStyle}>Ajouter</button>
      </div>

      {/* Zone principale du planning */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Sélecteurs fixes */}
        <div style={stickyHeaderStyle}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={selectStyle}>
              {months.map((month) => <option key={month} value={month}>{month}</option>)}
            </select>

            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={selectStyle}>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>

          {/* En-tête des jours */}
          <div style={{ display: "grid", gridTemplateColumns: "50px repeat(7, 1fr)", backgroundColor: "#23272a", paddingBottom: "10px" }}>
            <div></div>
            {days.map((day) => <div key={day} style={dayStyle}>{day}</div>)}
          </div>
        </div>

        {/* Planning scrollable */}
        <div style={scrollContainerStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "50px repeat(7, 1fr)", width: "100%" }}>
            {hours.map((hour) => (
              <>
                <div key={`hour-${hour}`} style={hourStyle}>{hour}</div>
                {days.map((day) => (
                  <div key={`${day}-${hour}`} style={cellStyle}>
                    {renderEvents(events, day, hour)}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Fonction d'affichage des événements */
const renderEvents = (events, day, hour) => {
  const hourInt = parseInt(hour);

  const event = events.find(e => e.day === day && parseInt(e.hour) === hourInt);
  const ongoingEvent = events.find(e => 
    e.day === day &&
    parseInt(e.hour) < hourInt &&
    parseInt(e.hour) + parseInt(e.duration) > hourInt
  );

  if (event) {
    return (
      <div style={{ ...eventStyle, height: `${event.duration * 50}px` }}>
        {event.title}
      </div>
    );
  }

  if (ongoingEvent) {
    return (
      <div style={{ ...eventStyle, height: "50px", backgroundColor: "#ffcc00", opacity: 0.8 }}></div>
    );
  }

  return null;
};

/* Styles */
const eventInputStyle = {
  width: "250px",
  padding: "15px",
  backgroundColor: "#23272a",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "5px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "none",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const stickyHeaderStyle = {
  position: "sticky",
  top: 0,
  backgroundColor: "#2c2f33",
  padding: "10px",
  zIndex: 10,
};

const scrollContainerStyle = {
  flexGrow: 1,
  overflowY: "auto",
  maxHeight: "70vh",
};

const dayStyle = {
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: "#40444b",
  padding: "10px",
  borderRadius: "5px",
};

const hourStyle = {
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: "#40444b",
  padding: "10px",
  borderRadius: "5px",
};

const eventStyle = {
  backgroundColor: "#ffcc00",
  color: "black",
  padding: "5px",
  borderRadius: "5px",
  fontWeight: "bold",
  textAlign: "center",
  position: "absolute",
  width: "100%",
};

const cellStyle = {
  minHeight: "50px",
  border: "1px solid #ccc",
  position: "relative",
  backgroundColor: "transparent",
};
