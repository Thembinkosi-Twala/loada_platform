"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { User} from "@prisma/client";

import Container from "@/components/Container";

import useLoginModal from "@/hooks/useLoginModal";
import { categories } from "@/constants";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  currentUser?: null | User;
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);


  const loginModal = useLoginModal();
  const router = useRouter();

 

  const onCreateReservation = () => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
         
          <div
            className="order-first mb-10 md:order-last md:col-span-3"
          >
            
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
