import React from "react";

import Container from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Listings from "@/components/listings/Listings";

export const dynamic = "force-dynamic";

const Home = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <Listings currentUser={currentUser} />
    </Container>
  );
};

export default Home;
