import React, { Component } from "react";

class DesktopNotification extends Component {
  constructor() {
    super();
    this.notification = null;
    this.showNotification = this.showNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Notification permission denied");
        }
      });
      this.scheduleNotification();
    }
  }

  scheduleNotification() {
    const now = new Date();
    const targetTime = new Date(); // Initialize target time as current time
    targetTime.setHours(20, 12, 0, 0); // Set target time to 7:15:00 PM
    targetTime.setHours(20, 13, 0, 0); // Set target time to 7:15:00 PM
    targetTime.setHours(20, 17, 0, 0); // Set target time to 7:15:00 PM
    targetTime.setHours(20, 18, 0, 0); // Set target time to 7:15:00 PM


    if (now > targetTime) {
      // If current time is past target time, schedule for tomorrow
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilNotification = targetTime - now;

    setTimeout(() => {
      this.showNotification();
      // Schedule next notification for the next day
      this.scheduleNotification();
    }, timeUntilNotification);
  }
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {

          // Service worker registration successful
          console.log('Service worker registered:', registration);
        })
        .catch(error => {
          console.error('Service worker registration failed:', error);
        });
    } else {
      console.error('Service workers are not supported in this browser.');
    }
  }

  getNotificationsFromServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then(registration => {
          if (registration) {
            registration.getNotifications()
              .then(notifications => {
                console.log('Notifications from service worker:', notifications);
              })
              .catch(error => {
                console.error('Error while getting notifications from service worker:', error);
              });
          } else {
            console.error('No service worker registration found.');
          }
        })
        .catch(error => {
          console.error('Error while getting service worker registration:', error);
        });
    } else {
      console.error('Service workers are not supported in this browser.');
    }
  }
  showNotification() {
    if (Notification.permission === "granted") {
      var options = {
        body: 'Notification Body',
        icon: 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        dir: 'ltr',
      };
  
      this.notification = new Notification('Hello World', options);
      console.log(this.notification.getNotifications())

    }
  }

  closeNotification() {
    if (this.notification) {
      this.notification.close();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.getNotificationsFromServiceWorker}>Show notification</button>
        <button onClick={this.closeNotification}>Close notification</button>
      </div>
    );
  }
}

export default DesktopNotification;
