import Link from "next/link";
import { categories } from "@/constants"; // Import the categories array
import { FC } from "react";
import { User } from "@prisma/client";

interface SidebarProps {
  currentUser: User | null;
  className: '';
  children: '';
}

const Sidebar: FC<SidebarProps> = ({ currentUser, className, children }) => {
  const isAdmin = currentUser?.isAdmin || false;

  // Filter categories based on admin access
  const filteredCategories = categories.filter(
    (category) => !category.adminOnly || (category.adminOnly && isAdmin)
  );

  return (
    <div className={className}>
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.label} className="mb-4">
            <Link href={category.href} className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg transition">
              <category.icon className="text-2xl" />
              <span>{category.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      {children && <div>{children}</div>} 
    </div>
  );
};

export default Sidebar;
