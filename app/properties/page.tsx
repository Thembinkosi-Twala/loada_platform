import React from "react";
import PropertiesClient from "./PropertiesClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import db from '@/libs/db'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  
};

export default PropertiesPage;
