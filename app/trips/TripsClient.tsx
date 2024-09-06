"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User} from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import useConfirmDelete from "@/hooks/useConfirmDelete";

interface TripsClientProps {
 
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const [isCanceling, setIsCanceling] = useState(false);
  const { onOpen, onClose } = useConfirmDelete();

  const onCancel = (id: string) => {
    setIsCanceling(true);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled!");
        router.refresh();
      })
      .catch((error) => toast.error(error?.response?.data?.error))
      .finally(() => {
        setIsCanceling(false);
        onClose();
      });
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div
        className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4
        "
      >
       
      </div>
    </Container>
  );
};

export default TripsClient;
