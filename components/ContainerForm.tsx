import { useState } from "react";
import { Container } from "@prisma/client";

const ContainerForm = () => {
  const [container, setContainer] = useState<Container>({
    id: "",
    containerNumber: "",
    size: "",
    type: "",
    status: "",
    location: "",
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (
      !container.containerNumber ||
      !container.size ||
      !container.type ||
      !container.status ||
      !container.location
    ) {
      alert("Please fill in all fields");
      return;
    }
    // Call API to create a new container
    const response = await fetch("/api/containers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(container),
    });
    const data = await response.json();
    console.log(data);
    // Reset form fields after submission
    setContainer({
      id: "",
      containerNumber: "",
      size: "",
      type: "",
      status: "",
      location: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Container Number:
        <input
          type="text"
          value={container.containerNumber}
          onChange={(event) =>
            setContainer({ ...container, containerNumber: event.target.value })
          }
        />
      </label>
      <label>
        Size:
        <input
          type="text"
          value={container.size}
          onChange={(event) =>
            setContainer({ ...container, size: event.target.value })
          }
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={container.type}
          onChange={(event) =>
            setContainer({ ...container, type: event.target.value })
          }
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={container.status}
          onChange={(event) =>
            setContainer({ ...container, status: event.target.value })
          }
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={container.location}
          onChange={(event) =>
            setContainer({ ...container, location: event.target.value })
          }
        />
      </label>
      <button type="submit">Create Container</button>
    </form>
  );
};

export default ContainerForm;
