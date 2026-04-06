import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./src/api/queryClient";
import AppNavigator from "./src/navigation";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { asyncStoragePersister } from "./src/api/persistQueryClient";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { navigationRef } from "./src/navigation/index";

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const movieId = response.notification.request.content.data.movieId;

      if (movieId) {
        navigationRef.current?.navigate("MovieDetails", {
          movieId: Number(movieId),
        });
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
          <AppNavigator />
        </PersistQueryClientProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
