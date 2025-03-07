import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEventStore } from "../store/eventStore";
import { useAuthStore } from "../store/authStore";

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Toute la journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement prévu.",
};
export default function Planning() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const user = useAuthStore((state) => state.user);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: 60,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Convertir les événements au format attendu par react-big-calendar
  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startTime),
    end: new Date(moment(event.startTime).add(event.duration, "minutes")),
    description: event.description,
  }));

  // Gestion de l'ajout d'un événement
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return;

    if (editingEvent) {
      updateEvent(editingEvent.id, newEvent);
      setEditingEvent(null);
    } else {
      addEvent({ id: Date.now().toString(), ...newEvent, createdBy: user.id });
    }
    setNewEvent({ title: "", description: "", startTime: "", duration: 60 });
  };

  // Fonction pour gérer le clic sur un événement
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Fonction pour fermer la fenêtre des détails
  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="planning-container">
      <div className="planning-box">
        <h2 className="planning-title">Calendrier des événements</h2>
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          messages={messages}
          formats={{
            agendaDateFormat: (date, culture, localizer) =>
              moment(date).format("DD/MM/YYYY"),
          }}
        />
      </div>

      {/* Affichage des détails d'un événement sélectionné */}
      {selectedEvent && (
        <div className="event-details">
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p>📅 Début: {moment(selectedEvent.start).format("LLLL")}</p>
          <p>⏳ Durée: {moment(selectedEvent.end).diff(selectedEvent.start, "minutes")} minutes</p>
          {user?.role === "admin" && (
            <div className="event-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingEvent(selectedEvent);
                  setNewEvent({
                    title: selectedEvent.title,
                    description: selectedEvent.description,
                    startTime: moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"),
                    duration: moment(selectedEvent.end).diff(selectedEvent.start, "minutes"),
                  });
                  setSelectedEvent(null);
                }}
              >
                ✏️ Modifier
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
                    deleteEvent(selectedEvent.id);
                    setSelectedEvent(null);
                  }
                }}
              >
                ❌ Supprimer
              </button>
            </div>
          )}
          <button className="close-btn" onClick={handleCloseDetails}>Fermer</button>
        </div>
      )}

      {/* Formulaire d'ajout/modification d'événement (réservé aux admins) */}
      {user?.role === "admin" && (
        <div className="planning-box">
          <h2 className="planning-title">
            {editingEvent ? "Modifier l'événement" : "Ajouter un événement"}
          </h2>
          <form onSubmit={handleAddEvent} className="planning-form">
            <div className="input-group">
              <label>Titre</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Heure de début</label>
              <input
                type="datetime-local"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                required
              />
            </div>
            <div className="input-group">
              <label>Durée (minutes)</label>
              <input
                type="number"
                value={newEvent.duration}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, duration: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <button type="submit" className="planning-btn">
              {editingEvent ? "Modifier" : "Ajouter"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}