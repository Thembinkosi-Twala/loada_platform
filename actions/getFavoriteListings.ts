import {getCurrentUser} from "./getCurrentUser";
import  db  from "@/libs/db";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

  
  } catch (error: any) {
    throw new Error(error);
  }
};
