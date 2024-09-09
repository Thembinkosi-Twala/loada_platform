// components/PreAdviceCheck.tsx
import { useEffect } from "react";
import axios from "axios";
import prisma from "@/libs/db";

const PreAdviceCheck = () => {
  useEffect(() => {
    const checkPreAdvice = async () => {
      try {
        const { data } = await axios.get("/api/transnet", {
          params: { containerNumber, requestType: "pre-advice" },
        });
        setIsPreAdvised(data.isPreAdvised);
        setStep(data.isPreAdvised ? 2 : 1);
      } catch (error) {
        console.error(error);
      }
    };

    checkPreAdvice();
  }, [containerNumber]);

  return <p>Checking pre-advice status...</p>;
};

export default PreAdviceCheck;
function setIsPreAdvised(isPreAdvised: any) {
  throw new Error("Function not implemented.");
}

function setStep(arg0: number) {
  throw new Error("Function not implemented.");
}

