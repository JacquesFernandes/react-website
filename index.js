
function registerServiceWorker()
{
  if (navigator.serviceWorker && window.PushManager){
    window.addEventListener("load", (event) => {
      navigator.serviceWorker.register("/assets/js/serviceWorker.js")
      .then((registration) => {
        console.log("Service worker registered!:",registration);
        registration.showNotification("Testing", {
          body: "Do you read me?"
        })
      })
      .catch((err) => {
        console.error("Error with registering service worker:",err);
      });
    });
  }
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    var permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      console.error('We weren\'t granted permission.');
    }
  });
}

askPermission()
.then(()=> {
  console.log("Got Permission!");
})