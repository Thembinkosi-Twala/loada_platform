import React, { FC, useState } from "react";
import { Booking, User } from "@prisma/client";
import axios from "axios";

interface BookingProps {
  currentUser: User | null;
  listingId: string;
}

const Bookings: FC<BookingProps> = ({ currentUser, listingId }) => {
  const [containerNumber, setContainerNumber] = useState("");
  const [timeslotId, setTimeslotId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/bookings", {
        containerNumber,
        timeslotId,
        referenceNumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Container Number:
        <input
          type="text"
          value={containerNumber}
          onChange={(event) => setContainerNumber(event.target.value)}
        />
      </label>
      <label>
        Timeslot ID:
        <input
          type="text"
          value={timeslotId}
          onChange={(event) => setTimeslotId(event.target.value)}
        />
      </label>
      <label>
        Reference Number:
        <input
          type="text"
          value={referenceNumber}
          onChange={(event) => setReferenceNumber(event.target.value)}
        />
      </label>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default Bookings;
