import React, { useState } from "react";

interface Container {
  id: string;
  containerNumber: string;
  slots: string[];
}

interface Props {
  category: {
    label: string;
    icon: React.ComponentType;
    description: string;
    href: string;
  } | null;
  containers: Container[];
}

const BookingSlotsPage: React.FC<Props> = ({ category, containers }) => {
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleContainerSelection = (container: Container) => {
    setSelectedContainer(container);
    setSelectedSlot(null); // Reset slot selection when changing container
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !selectedContainer ||
      !selectedSlot ||
      !bookingName ||
      !bookingEmail ||
      !bookingPhone
    ) {
      alert("Please fill in all fields and select a container and slot");
      return;
    }
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          containerId: selectedContainer.id,
          timeslotId: selectedSlot,
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
        }),
      });
      if (response.ok) {
        setBookingSuccess(true);
        setBookingName("");
        setBookingEmail("");
        setBookingPhone("");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Failed to book slot:", error);
    }
  };

  if (!category) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Category Not Found</h1>
        <p>The selected category does not exist or is not available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{category.label}</h1>
      <div className="text-4xl mb-4">
        <category.icon />
      </div>
      <p className="mt-2 mb-4">{category.description}</p>

      <div>
        <h2 className="text-lg font-semibold">Select Container</h2>
        <ul className="list-disc ml-5">
          {containers.length > 0 ? (
            containers.map((container) => (
              <li key={container.id} className="mb-2">
                <button
                  className={`p-2 border rounded-lg ${
                    selectedContainer?.id === container.id
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleContainerSelection(container)}
                >
                  {container.containerNumber}
                </button>
              </li>
            ))
          ) : (
            <p>No containers available</p>
          )}
        </ul>
        {selectedContainer && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Select Slot</h3>
            <ul className="list-disc ml-5">
              {selectedContainer.slots.length > 0 ? (
                selectedContainer.slots.map((slot) => (
                  <li key={slot} className="mb-2">
                    <button
                      className={`p-2 border rounded-lg ${
                        selectedSlot === slot
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleSlotSelection(slot)}
                    >
                      {slot}
                    </button>
                  </li>
                ))
              ) : (
                <p>No slots available</p>
              )}
            </ul>
            <form onSubmit={handleBooking}>
              <label>
                Name:
                <input
                  type="text"
                  value={bookingName}
                  onChange={(event) => setBookingName(event.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={bookingEmail}
                  onChange={(event) => setBookingEmail(event.target.value)}
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  value={bookingPhone}
                  onChange={(event) => setBookingPhone(event.target.value)}
                />
              </label>
              <button type="submit">Book Slot</button>
              {bookingSuccess && (
                <p className="text-green-500">Booking successful!</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSlotsPage;
