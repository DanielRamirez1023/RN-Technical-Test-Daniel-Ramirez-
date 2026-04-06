import { create } from "zustand";

interface NotificationsState {
  notifications: Record<number, string>;
  setNotification: (movieId: number, notificationId: string) => void;
  removeNotification: (movieId: number) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: {},

  setNotification: (movieId, notificationId) => {
    set((state) => ({
      notifications: {
        ...state.notifications,
        [movieId]: notificationId,
      },
    }));
  },

  removeNotification: (movieId) => {
    set((state) => {
      const newNotifications = { ...state.notifications };
      delete newNotifications[movieId];
      return { notifications: newNotifications };
    });
  },
}));
