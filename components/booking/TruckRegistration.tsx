// components/TruckRegistration.tsx
import { useState } from "react";
import axios from "axios";
import { id } from "date-fns/locale";

const TruckRegistration = ({ containerId, userId }) => {
  const [truckNumber, setTruckNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [towerLocation, setTowerLocation] = useState("");

  const handleTruckSubmit = async () => {
    try {
      // Simulate reference number generation
      const generatedReferenceNumber = `REF${Math.floor(
        Math.random() * 100000
      )}`;
      setReferenceNumber(generatedReferenceNumber);

      // Create booking
      const { data } = await axios.post("/api/bookings", {
        userId,
        containerId,
        timeslotId: id, // Replace with selected timeslot ID
        referenceNumber: generatedReferenceNumber,
      });

      setTowerLocation("Tower 205"); // Simulate tower assignment
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Enter Truck Registration Number</h2>
      <input
        type="text"
        value={truckNumber}
        onChange={(e) => setTruckNumber(e.target.value)}
        className="border p-2"
        placeholder="Truck Registration"
      />
      <button onClick={handleTruckSubmit} className="btn btn-primary">
        Confirm Truck
      </button>

      {referenceNumber && (
        <div>
          <h3>Reference Number: {referenceNumber}</h3>
          <h3>Tower Location: {towerLocation}</h3>
        </div>
      )}
    </div>
  );
};

export default TruckRegistration;
