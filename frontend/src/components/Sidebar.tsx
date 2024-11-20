import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

// Example Icons (replace with actual icons)
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBill,
  FaUndo,
  FaSlidersH,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaShieldAlt,
  FaCogs,
  FaCalendarAlt,
  FaSignOutAlt,
  FaFolder,
  FaSitemap,
  FaKey,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-green-900 text-white flex flex-col">
      <div className="flex items-center p-4 space-x-3">
        <div className="bg-green-600 rounded-full h-10 w-10 flex items-center justify-center">
          {/* User Icon Placeholder */}
          <span className="text-xl">👤</span>
        </div>
        <span className="text-xl font-semibold  text-green-200">
          Aditya Tiwari
        </span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2">
        <SidebarItem to="/Dashboard" Icon={FaTachometerAlt} label="Dashboard" />
        <SidebarItem
          to="/Dashboard/Borrowers"
          Icon={FaUsers}
          label="Borrowers"
        />
        <SidebarItem to="/Dashboard/Loans" Icon={FaMoneyBill} label="Loans" />
        <SidebarItem
          to="/Dashboard/Repayments"
          Icon={FaUndo}
          label="Repayments"
        />
        <SidebarItem
          to="/Dashboard/LoanParameters"
          Icon={FaSlidersH}
          label="Loan Parameters"
        />
        <SidebarItem
          to="/Dashboard/Accounting"
          Icon={FaFileInvoiceDollar}
          label="Accounting"
        />
        <SidebarItem to="/Dashboard/Reports" Icon={FaFileAlt} label="Reports" />
        <SidebarItem
          to="/Dashboard/Collateral"
          Icon={FaFolder}
          label="Collateral"
        />
        <SidebarItem
          to="/Dashboard/AccessConfiguration"
          Icon={FaShieldAlt}
          label="Access Configuration"
        />
        <SidebarItem to="/Dashboard/Savings" Icon={FaSitemap} label="Savings" />
        <SidebarItem to="/Dashboard/Exposures" Icon={FaKey} label="Exposures" />
        <SidebarItem
          to="/Dashboard/Enclosures"
          Icon={FaFolder}
          label="Enclosures"
        />
        <SidebarItem
          to="/Dashboard/InvestorAccounts"
          Icon={FaUsers}
          label="Investor Accounts"
        />
        <SidebarItem
          to="/Dashboard/Calendar"
          Icon={FaCalendarAlt}
          label="Calendar"
        />
        <SidebarItem to="/Dashboard/Settings" Icon={FaCogs} label="Settings" />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  Icon: React.ComponentType;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300 ${
          isActive ? "bg-green-700" : ""
        }`
      }
    >
      <Icon />
      <span className="ml-3">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
