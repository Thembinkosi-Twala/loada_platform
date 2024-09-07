import { useEffect, useState } from "react";
import { Container } from "@prisma/client";
import ContainerForm from "@/components/ContainerForm";

const ContainerManagement = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [newContainerName, setNewContainerName] = useState("");
  const [newContainerStatus, setNewContainerStatus] = useState("");
  const [availableSlots, setAvailableSlots] = useState([
    "Slot 1",
    "Slot 2",
    "Slot 3",
  ]);
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await fetch("/api/getContainers");
        const data = await response.json();
        setContainers(data);
      } catch (error) {
        console.error("Failed to fetch containers:", error);
      }
    };

    fetchContainers();
  }, []);

  const handleAddContainer = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/getContainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          containerNumber: newContainerName,
          status: newContainerStatus,
          location: newSlot,
        }),
      });
      const data = await response.json();
      setContainers([...containers, data]);
      setNewContainerName("");
      setNewContainerStatus("");
      setNewSlot("");
    } catch (error) {
      console.error("Failed to add container:", error);
    }
  };
  const handleEditContainer = (container: { id: string; containerNumber: string; size: string; type: string; status: string; location: string; }) => {
    // Navigate to edit page or open edit modal with container data
    console.log("Edit container:", container);
  };

  const handleDeleteContainer = async (id: string) => {
    try {
      const response = await fetch(`/api/containers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Update containers state to reflect deletion
        setContainers(containers.filter((container) => container.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete container:", error);
    }
  };

  return (
    <div>
      <h1>Container Management</h1>
      <ContainerForm />
      <h2>Current Containers</h2>
      {containers.length === 0 ? (
        <p>No containers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Container Number</th>
              <th>Status</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((container) => (
              <tr key={container.id}>
                <td>{container.containerNumber}</td>
                <td>{container.status}</td>
                <td>{container.location}</td>
                <td>
                  <button onClick={() => handleEditContainer(container)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteContainer(container.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        label {
          margin-bottom: 10px;
        }
        input,
        select {
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #4caf50;
          color: #fff;
          cursor: pointer;
        }
        button:hover {
          background-color: #3e8e41;
        }
      `}</style>
    </div>
  );
};

export default ContainerManagement;
