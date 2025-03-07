import { create } from "zustand";
import { persist } from "zustand/middleware";
import chatsData from "../data/chats.json";

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: JSON.parse(localStorage.getItem("chats")) || chatsData.chats || [],
      activeChat: null,

      setActiveChat: (chatId) => set({ activeChat: chatId }),

      addMessage: (chatId, message) => {
        set((state) => {
          const updatedChats = state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...(chat.messages || []), message] }
              : chat
          );

          localStorage.setItem("chats", JSON.stringify(updatedChats));
          return { chats: updatedChats };
        });
      },

      addChat: (newChat) => {
        set((state) => {
          const updatedChats = [...state.chats, { ...newChat, messages: [], members: newChat.members }];
          localStorage.setItem("chats", JSON.stringify(updatedChats));
          return { chats: updatedChats };
        });
      },

      updateChat: (chatId, updatedChat) => {
        set((state) => {
          const updatedChats = state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, ...updatedChat } : chat
          );
          localStorage.setItem("chats", JSON.stringify(updatedChats));
          return { chats: updatedChats };
        });
      },      

      deleteChat: (chatId) => {
        set((state) => {
          // Supprimer le salon de tous les utilisateurs
          const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
          
          // Mettre à jour le localStorage
          localStorage.setItem("chats", JSON.stringify(updatedChats));
          
          return { chats: updatedChats, activeChat: null };
        });
      },
    }),
    {
      name: "chat-storage",
    }
  )
);
