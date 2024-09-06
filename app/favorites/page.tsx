import React from "react";

import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getFavoriteListings } from "@/actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

};

export default FavoritesPage;
