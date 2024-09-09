import React from "react";

import TripsClient from "./TripsClient";
import EmptyState from "@/components/EmptyState";

import {getCurrentUser} from "@/actions/getCurrentUser";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

};

export default TripsPage;
