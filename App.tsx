import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./src/api/queryClient";
import AppNavigator from "./src/navigation";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { asyncStoragePersister } from "./src/api/persistQueryClient";

export default function App() {
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
