// components/BookingForm.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import TimeSlotSelection from "./TimeSlotSelection";
import TruckRegistration from "./TruckRegistration";
import prisma from "@/libs/db";

const BookingForm = () => {
  const [containers, setContainers] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [step, setStep] = useState(1);
  const [userId] = useState("123");
  // Assume user is logged in and userId is known

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data } = await axios.get("/api/getContainers");
        setContainers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContainers();
  }, []);

  const handleContainerSubmit = () => {
    if (selectedContainer) {
      setStep(2); // Move to time slot selection
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Select Container</h2>
          <select
            value={selectedContainer}
            onChange={(e) => setSelectedContainer(e.target.value)}
            className="border p-2"
          >
            <option value="">-- Select Container --</option>
            {containers.map((container) => (
              <option key={container.id} value={container.id}>
                {container.containerNumber}
              </option>
            ))}
          </select>
          <button onClick={handleContainerSubmit} className="btn btn-primary">
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <TimeSlotSelection containerId={selectedContainer} setStep={setStep} />
      )}
      {step === 3 && (
        <TruckRegistration containerId={selectedContainer} userId={userId} />
      )}
    </div>
  );
};
export default BookingForm;
