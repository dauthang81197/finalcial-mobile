import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const token = null; // logic lấy token

  useEffect(() => {
    if (!token) {
      // redirect sau khi layout mount
      setTimeout(() => router.replace("/(auth)/login"), 0);
    }
  }, [router, token]);

  // Render Slot ngay lập tức để navigator của Expo Router hoạt động
  return <Slot />;
}
