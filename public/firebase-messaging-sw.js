importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyD7kPOrnB_1bfdND2zB1mDtdwCDYp4jVZY",
  authDomain: "codehub-bac6f.firebaseapp.com",
  projectId: "codehub-bac6f",
  storageBucket: "codehub-bac6f.appspot.com",
  messagingSenderId: "300433827891",
  appId: "1:300433827891:web:7da4ad1d78737b76bb9b46",
  measurementId: "G-WEY9Q93WDZ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // Show a push notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  // Handle notification click event
  const urlToOpen = new URL("/", self.location.origin).href;

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }

      // If no existing window/tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
