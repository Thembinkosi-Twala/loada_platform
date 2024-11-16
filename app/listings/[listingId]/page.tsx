import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/getListingById";

interface IParams {
  listingId: string; // Make listingId required for dynamic routes
}
interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params; // Resolve the promise for params

  // Fetch the listing and current user
  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();

  // Handle empty state
  if (!listing) {
    return (
      <EmptyState
        title="Listing not found"
        subtitle="The listing you are looking for does not exist."
      />
    );
  }

  return <ListingClient currentUser={currentUser} />;
};

export default ListingPage;

