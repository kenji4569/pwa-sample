
//ServiceWorkerにインストールされるスクリプト
//プッシュ通知が行われると「push」イベントが起動する
self.addEventListener("install", function(event) {
    self.skipWaiting();
    console.log("Installed", event);
});

self.addEventListener("activate", function(event) {
    console.log("Activated", event);
});

self.addEventListener("push", function(event) {
    console.log("Push message received", event);
    self.registration.pushManager.getSubscription().then(function(subscription) {
        if (subscription) {
            console.log("subscription:", subscription);

            return self.registration.showNotification('title', {
              body: 'xxx',
              tag: "push-test",
              actions: [{
                  action: "act1",
                  title: "ボタン１"
              }, {
                  action: "act2",
                  title: "ボタン２"
              }]
          })
        } else {
          //throw new Error("User not subscribed");
        }
    });
});
//押したaction名はnotificationclickのevent.actionで取得できます。

self.addEventListener("notificationclick", function(event) {
    console.log("notification clicked:" + event);
    console.log("action:" + event.action);
    event.notification.close();

    var url = "/";
    if (event.notification.data.url) {
        url = event.notification.data.url
    }

    event.waitUntil(
            clients.matchAll({type: "window"}).then(function() {
            if(clients.openWindow) {
              return clients.openWindow(url)
            }
        })
    );
});
