// getFCMToken.js
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const getFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BD8ErOmt37eczcySWwEOv1wZarz6tdxegb6SQBHspzgybF5h0bm7u-S8_7j-I7vI4pBJXiKohXO0bJZNnkJ9hiM",
      });

      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

const getFCM = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BD8ErOmt37eczcySWwEOv1wZarz6tdxegb6SQBHspzgybF5h0bm7u-S8_7j-I7vI4pBJXiKohXO0bJZNnkJ9hiM",
      });
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export default getFCMToken;
export { getFCM };
