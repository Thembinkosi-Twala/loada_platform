import { IconType } from "react-icons";


export interface Category {
  label: string;
  icon: IconType;
  description?: string;
}

export type Container = {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode; // Assuming you have an icon or image for each container type
};
