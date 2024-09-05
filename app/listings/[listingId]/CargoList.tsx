// app/listings/CargoList.tsx

import { useEffect, useState } from "react";

interface Cargo {
  id: string;
  containerNumber: string;
  size: string;
}

const CargoList = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);

  useEffect(() => {
    const fetchCargos = async () => {
      const response = await fetch("/listings");
      const data = await response.json();
      setCargos(data);
    };

    fetchCargos();
  }, []);

  return (
    <div>
      <h1>Available Cargos</h1>
      <ul>
        {cargos.map((cargo) => (
          <li key={cargo.id}>
            <p>Container Number: {cargo.containerNumber}</p>
            <p>Size: {cargo.size}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CargoList;
