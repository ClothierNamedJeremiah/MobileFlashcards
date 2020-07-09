import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications';

const createNotification = () => ({
  title: "Study Time!",
  body: "👋 don't forget to log your stats for today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true,
  }
})

export const clearLocalNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
)

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            const trigger = new Date();
            trigger.setDate(trigger.getDate() + 1);
            trigger.setHours(11);
            trigger.setMinutes(0);

            Notifications.scheduleNotificationAsync({
              content: {
                title: "Study Time!",
                body: "👋 don't forget to log your stats for today!",
              },
              trigger,
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}