// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCYyCNJ-ytZL1NezfFzTSxQFPx6tEnzbMg",
  authDomain: "second-shot-1d28a.firebaseapp.com",
  projectId: "second-shot-1d28a",
  storageBucket: "second-shot-1d28a.firebasestorage.app",
  messagingSenderId: "754667042297",
  appId: "1:754667042297:web:dd3bde11f4a3c9c0ad7928",
  measurementId: "G-4TMJEYGQFX",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
