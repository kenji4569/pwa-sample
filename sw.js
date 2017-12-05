// importScripts("./js/sw.js");
//
importScripts('https://www.gstatic.com/firebasejs/4.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.7.0/firebase-messaging.js');
importScripts('./init.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
