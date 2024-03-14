import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { registerForPushNotificationsAsync } from '@/src/lib/notifications';
import { ExpoPushToken } from 'expo-notifications';
import * as Notifications from 'expo-notifications';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from './AuthProvider';
import { useRouter } from 'expo-router';
// import { PropsWithChildren, useEffect, useRef, useState } from 'react';
// import { registerForPushNotificationsAsync } from '@/lib/notifications';
// import { ExpoPushToken } from 'expo-notifications';
// import * as Notifications from 'expo-notifications';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from './AuthProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  const router = useRouter();
  const { profile } = useAuth();

  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  
  
  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);
    if (!newToken || !profile?.id) {
      return;
    }
    console.log(profile.id);
    console.log('Saving push token to database');
    console.log(newToken);
    // update the token in the database
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken })
      .eq('id', profile.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    Notifications.addNotificationResponseReceivedListener(response => {
        // Handle the notification response here (user tapped on notification)
        const data = response.notification.request.content.data; // Custom data sent with the notification
       console.log('Notification response received NEW');
        //navigateToRoute(data); // A function to handle navigation based on notification data
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
            const data = response.notification.request.content.data
            console.log(data.notifyPushToPath);
            console.log(response);
            
            // take user to /(user)/orders
            router.push(data.notifyPushToPath);
          
        });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  console.log('Push token: ', expoPushToken);
  console.log('Notif: ', notification);

  return <>{children}</>;
};

export default NotificationProvider;