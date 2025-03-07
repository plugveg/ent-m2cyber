import React, { useState, useEffect } from "react";
import { useEventStore } from "../store/eventStore";
import { useAuthStore } from "../store/authStore";
import { format, parseISO } from "date-fns";

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

  // Fonction pour ajouter un nouvel événement
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

  // Fonction pour charger un événement dans le formulaire pour modification
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      duration: event.duration,
    });
  };

  // Fonction pour supprimer un événement
  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="planning-container">
      <div className="planning-box">
        <h2 className="planning-title">Événements à venir</h2>
        <div className="events-list">
          {events.length > 0 ? (
            events
              .filter((event) => event.startTime) // On s'assure que startTime existe
              .sort((a, b) => (a.startTime && b.startTime ? a.startTime.localeCompare(b.startTime) : 0))
              .map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>📅 {format(parseISO(event.startTime), "PPpp")}</p>
                  <p>⏳ {event.duration} minutes</p>
                  {user?.role === "admin" && (
                    <div className="event-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditEvent(event)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        ❌ Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="no-events">Aucun événement prévu.</p>
          )}
        </div>
      </div>

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
