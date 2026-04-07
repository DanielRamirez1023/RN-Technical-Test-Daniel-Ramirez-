import * as Notifications from "expo-notifications";
import i18n from "../i18n";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const scheduleMovieReminder = async (movieId: number, movieTitle: string) => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t("notifications.reminderTitle"),
      body: i18n.t("notifications.reminderBody", { title: movieTitle }),
      data: { movieId },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 180,
    },
  });

  return notificationId;
};

export const cancelNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
