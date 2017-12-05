// Initialises firebase
// TODO: fill in firebase config information
var config = {
  apiKey: "AIzaSyDb1cn6aWezFzXZNYltEpt7DrCrbpOya3g",
  authDomain: "supple-design-187902.firebaseapp.com",
  databaseURL: "https://supple-design-187902.firebaseio.com",
  projectId: "supple-design-187902",
  storageBucket: "",
  messagingSenderId: "1004766588910"
};

firebase.initializeApp(config);
var messaging = firebase.messaging();

// On load register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
      // Successfully registers service worker
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      messaging.useServiceWorker(registration);
    })
    .then(() => {
      // Requests user browser permission
      return messaging.requestPermission();
    })
    .then(() => {
      // Gets token
      return messaging.getToken();
    })
    .then((token) => {
      console.log('Got a token')
      console.log(token)

    })
    .catch((err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
  }