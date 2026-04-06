import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const scheduleMovieReminder = async (movieId: number, movieTitle: string) => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "🎬 Recordatorio",
      body: `¿Listo para ver ${movieTitle}?`,
      data: { movieId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 180, // 3 minutes
    },
  });

  return notificationId;
};

export const cancelNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
