import React, { Component } from "react";
import axios from "axios";

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
      // Fetch due medications initially
      this.fetchDueMedications();
      // Set interval to fetch due medications every minute
      this.timer = setInterval(this.fetchDueMedications, 60000); // 60000 milliseconds = 1 minute
    }
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts to avoid memory leaks
    clearInterval(this.timer);
  }

  fetchDueMedications() {
    axios.get('http://localhost:8000/api/dueMedications')
      .then(response => {
        const data = response.data;
        console.log("Due Medications:", data);
        // Trigger a desktop notification for each medication
        data.forEach(medication => {
          this.showNotification(medication.name); // Assuming medication has a 'name' attribute
        });
      })
      .catch(error => console.error('Error:', error));
  }

  scheduleNotification() {
    const now = new Date();
    const targetTime = new Date(); // Initialize target time as current time
    targetTime.setHours(22, 44, 0, 0); // Set target time to 10:07:00 PM

    if (now > targetTime) {
      // If current time is past target time, schedule for tomorrow
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilNotification = targetTime - now;

    setTimeout(() => {
      // Show notification only if it's the target time
      const currentTime = new Date();
      if (
        currentTime.getHours() === 22 && // 10 PM
        currentTime.getMinutes() === 44 // 07 minutes
      ) {
        this.showNotification();
      }
      // Schedule next notification for the next day
      this.scheduleNotification();
    }, timeUntilNotification);
  }

  showNotification(medicationName) {
    if (Notification.permission === "granted") {
      const options = {
        body: `It's time to take ${medicationName}`, // Use the medication name in the notification
        icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        dir: "ltr"
      };

      const notification = new Notification("Medication Reminder", options);
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
        <button onClick={this.closeNotification}>Close Notification</button>
      </div>
    );
  }
}

export default DesktopNotification;
