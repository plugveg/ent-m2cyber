import { create } from "zustand";
import { persist } from "zustand/middleware";
import usersData from "../data/users.json"; // 📌 Importer les utilisateurs initiaux

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: JSON.parse(localStorage.getItem("users")) || usersData.users, // 📌 Charger depuis users.json si localStorage est vide

      login: (username, password) => {
        const users = get().users; 
        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword });
          localStorage.setItem("user", JSON.stringify(userWithoutPassword)); // 📌 Sauvegarder l'utilisateur connecté
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem("user"); // 📌 Supprimer l'utilisateur connecté
      },

      createUser: (newUser) => {
        set((state) => {
          const updatedUsers = [...state.users, { id: Date.now().toString(), ...newUser }];
          localStorage.setItem("users", JSON.stringify(updatedUsers)); 
          return { users: updatedUsers };
        });
      },

      updateUserRole: (username, newRole) => {
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.username === username ? { ...user, role: newRole } : user
          );

          localStorage.setItem("users", JSON.stringify(updatedUsers)); 
          return { users: updatedUsers };
        });
      },

      deleteUser: (username) => {
        set((state) => {
          const updatedUsers = state.users.filter((user) => user.username !== username);
          localStorage.setItem("users", JSON.stringify(updatedUsers)); 
          return { users: updatedUsers };
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
