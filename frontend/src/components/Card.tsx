import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Define props structure
interface LoanCardProps {
  loan: {
    id: string; // Loan ID
    officer: string;
    amount: string;
    date: string;
    status: string;
  };
  actions: boolean;
  role?: "verifier" | "admin"; // Role is optional
}

// Function to assign a color class based on loan status
const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    APPROVED: "bg-blue-500 text-white",
    PENDING: "bg-yellow-500 text-white",
    REJECTED: "bg-red-500 text-white",
  };
  return colorMap[status] || "bg-gray-500 text-white";
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, actions, role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState(loan.status); // Local state for status management
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook to close the dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const actionsByRole =
    role === "verifier"
      ? ["Verify", "Reject"]
      : role === "admin"
      ? ["Accept", "Reject"]
      : [];

  const handleActionClick = async (action: string) => {
    let newStatus = "";

    if (action === "Verify") newStatus = "VERIFIED";
    else if (action === "Reject") newStatus = "REJECTED";
    else if (action === "Accept") newStatus = "APPROVED";

    if (!newStatus) return;

    try {
      const url =
        role === "verifier"
          ? `https://credit-sea-beige.vercel.app/loans/status-verifier?_id=${loan.id}`
          : `https://credit-sea-beige.vercel.app/loans/status-admin?_id=${loan.id}`;
      const payload =
        role === "verifier"
          ? { status: newStatus, loanOfficer: "Jon Okoh" }
          : { status: newStatus };

      await axios.patch(url, payload);
      setStatus(newStatus); // Update the local status
      console.log(`${role} updated loan ID: ${loan.id} to ${newStatus}`);
    } catch (error) {
      console.error("Error updating loan status", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b p-4 transition-all duration-200 relative">
      <div className="flex items-center">
        <img
          src={`https://i.pravatar.cc/40?u=${loan.officer}`}
          alt={loan.officer}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-md font-medium">{loan.officer}</h3>
          <p className="text-sm text-gray-500">Updated 1 day ago</p>
        </div>
      </div>
      <div className="text-gray-700">{loan.amount}</div>
      <div className="text-gray-500">{loan.date}</div>
      <span className={`px-4 py-2 rounded-full ${getStatusColor(status)}`}>
        {status}
      </span>

      {actions && role && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="ml-4 w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 focus:outline-none"
          >
            &#x22EE; {/* Vertical three dots */}
          </button>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 z-10 bg-white shadow-md rounded-md w-40">
              {actionsByRole.map((action) => (
                <li
                  key={action}
                  onClick={() => handleActionClick(action)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCard;
