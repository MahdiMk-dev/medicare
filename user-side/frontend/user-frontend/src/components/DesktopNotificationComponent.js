import React, { Component } from "react";

class DesktopNotification extends Component {
  constructor() {
    super();
    this.notification = null;
  }

  componentDidMount() {
    this.scheduleNotification();
  }

  scheduleNotification() {
    const now = new Date();
    const targetTime = new Date(); // Initialize target time as current time
    targetTime.setHours(19, 15, 0, 0); // Set target time to 12:00:00 AM

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

  showNotification() {
    if (Notification.permission === "granted") {
      var options = {
        body: 'Notification Body',
        icon: 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        dir: 'ltr',
      };
  
      this.notification = new Notification('Hello World', options);
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
        <button onClick={this.showNotification}>Show notification</button>
        <button onClick={this.closeNotification}>Close notification</button>
      </div>
    );
  }
}

export default DesktopNotification;
