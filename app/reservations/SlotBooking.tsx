// app/reservations/SlotBooking.tsx

import { useState } from "react";

const SlotBooking = () => {
  const [userId, setUserId] = useState("");
  const [containerId, setContainerId] = useState("");
  const [timeslotId, setTimeslotId] = useState("");

  const handleBooking = async () => {
    const response = await fetch("/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, containerId, timeslotId }),
    });

    if (response.ok) {
      alert("Booking successful!");
    } else {
      alert("Booking failed!");
    }
  };

  return (
    <div>
      <h1>Book a Slot</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Container ID"
        value={containerId}
        onChange={(e) => setContainerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Timeslot ID"
        value={timeslotId}
        onChange={(e) => setTimeslotId(e.target.value)}
      />
      <button onClick={handleBooking}>Book Slot</button>
    </div>
  );
};

export default SlotBooking;
