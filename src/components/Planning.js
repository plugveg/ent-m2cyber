import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEventStore } from "../store/eventStore";
import { useAuthStore } from "../store/authStore";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import fr from 'date-fns/locale/fr'

const locales = {
  'fr': fr,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

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
    </div>
  );
}
