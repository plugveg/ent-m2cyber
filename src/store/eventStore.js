import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEventStore = create(
  persist(
    (set, get) => ({
      events: JSON.parse(localStorage.getItem("events")) || [],

      addEvent: (event) => {
        set((state) => {
          const updatedEvents = [...state.events, event];
          localStorage.setItem("events", JSON.stringify(updatedEvents));
          return { events: updatedEvents };
        });
      },

      updateEvent: (eventId, updatedEvent) => {
        set((state) => {
          const updatedEvents = state.events.map((event) =>
            event.id === eventId ? { ...event, ...updatedEvent } : event
          );
          localStorage.setItem("events", JSON.stringify(updatedEvents));
          return { events: updatedEvents };
        });
      },

      deleteEvent: (eventId) => {
        set((state) => {
          const updatedEvents = state.events.filter(
            (event) => event.id !== eventId
          );
          localStorage.setItem("events", JSON.stringify(updatedEvents));
          return { events: updatedEvents };
        });
      },
    }),
    {
      name: "event-storage",
    }
  )
);
