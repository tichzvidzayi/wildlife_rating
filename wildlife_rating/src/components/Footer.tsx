import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-1 pt-2 text-white">
      <div className="text-center text-sm mt-4">
        &copy; {new Date().getFullYear()} Earth Wildlife. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
