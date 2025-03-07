
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { replace } from "expo-router/build/global-state/routing";
import { useEffect } from "react";


const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //Check if user is Authenticated or not
    if (typeof isAuthenticated=='undefined') {
      router.replace("/");
      return;
    }
     

    const inApp = segments[0] =="app";

    if (isAuthenticated && !inApp) {
      // redirect to chat
      router.replace("/(app)/Chat");
    } else if(!isAuthenticated) {
      //redirect to signIn
      router.replace("/SignIn");
    }
  }, [isAuthenticated]);

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
