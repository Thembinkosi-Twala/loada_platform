// components/TimeSlotSelection.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const TimeSlotSelection = ({ containerNumber, setStep }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const { data } = await axios.get("/api/transnet", {
        params: { requestType: "time-slots" },
      });
      setTimeSlots(data.timeSlots);
    };

    fetchTimeSlots();
  }, []);

  const handleSlotSubmit = () => {
    if (selectedSlot) {
      setStep(3); // Proceed to truck registration
    }
  };

  return (
    <div>
      <h2>Select Time Slot</h2>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        className="border p-2"
      >
        <option value="">-- Select Time Slot --</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <button onClick={handleSlotSubmit} className="btn btn-primary">
        Confirm Slot
      </button>
    </div>
  );
};
export default TimeSlotSelection;
