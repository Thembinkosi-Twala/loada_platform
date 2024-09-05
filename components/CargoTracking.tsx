import axios from "axios";
import React, { FC, useEffect, useState } from "react";

interface CargoTrackingProps {
  containerNumber: string;
}

const CargoTracking: FC<CargoTrackingProps> = ({ containerNumber }) => {
  const [cargoTrackingInfo, setCargoTrackingInfo] = useState({
    location: "",
    status: "",
  });

  const fetchCargoTrackingInfo = async () => {
    try {
      const response = await axios.get(
        `/api/cargo-tracking/${containerNumber}`
      );
      setCargoTrackingInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCargoTrackingInfo();
  }, [containerNumber]);

  return (
    <div>
      <h2>Cargo Tracking</h2>
      <p>Container Number: {containerNumber}</p>
      <p>Location: {cargoTrackingInfo.location}</p>
      <p>Status: {cargoTrackingInfo.status}</p>
    </div>
  );
};

export default CargoTracking;
