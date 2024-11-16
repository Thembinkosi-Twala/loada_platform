import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className = "bg-gray-800 text-white py-2 text-center fixed bottom-0 left-0 right-0" >
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Loada Platform. All rights reserved.
            </p>
            <div className="flex justify-center space-x-2 mt-1">
              <Link href="/privacy-policy" className="text-xs hover:underline">
                Privacy Policy
              </Link>
              <Link href="/TermsOfUse" className="text-xs hover:underline">
                Terms of Service
              </Link>
            </div>
          </footer >
    );
};

export default Footer;
