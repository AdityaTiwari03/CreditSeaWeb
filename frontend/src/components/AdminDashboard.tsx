import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.tsx";
import LoanList from "./AdminLL.tsx";
import { useParams } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBill,
  FaUndo,
  FaSlidersH,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";

// Loan interface to describe the loan object structure
interface Loan {
  borrowers: number;
  activeusers: number;
  loanscount: number;
  casedisbursed: number;
}

// Fetch loan data hook to separate data fetching logic
const useFetchLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          `https://credit-sea-beige.vercel.app/loans/summary`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        const updated_data = data.map((loan: any) => ({
          borrowers: loan.borrowUserCount,
          activeusers: loan.activeUserCount,
          loanscount: loan.approvedLoanCount,
          casedisbursed: loan.totalDisbursedloanAmount,
        }));

        setLoans(updated_data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return { loans, loading, error };
};

// Main Dashboard component
const VerifierDashboard: React.FC = () => {
  const { officerId } = useParams<{ officerId: string }>();
  const { loans, loading, error } = useFetchLoans();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-100 flex-1 overflow-scroll">
          <StatsSection loans={loans} />

          <LoanListSection />
        </div>
      </div>
    </div>
  );
};

// Stats section to display loan statistics
interface StatsSectionProps {
  loans: Loan[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ loans }) => {
  const loanStats = loans[0]; // Assuming first entry for now

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <StatCard
        label="Active"
        value={loanStats?.activeusers.toString()}
        icon={FaUsers}
      />
      <StatCard
        label="Loans"
        value={loanStats?.loanscount.toString()}
        icon={FaTachometerAlt}
      />
      <StatCard
        label="Borrowers"
        value={loanStats?.borrowers.toString()}
        icon={FaMoneyBill}
      />
      <StatCard
        label="Cash Disbursed"
        value={loanStats?.casedisbursed.toString()}
        icon={FaUndo}
      />
      {/* Static Values */}
      <StatCard label="Savings" value="450,000" icon={FaSlidersH} />
      <StatCard
        label="Cash Received"
        value="1,000,000"
        icon={FaFileInvoiceDollar}
      />
      <StatCard label="Repaid Loans" value="1,000,000" icon={FaFileAlt} />
      <StatCard label="Other Accounts" value="10" icon={FaShieldAlt} />
    </div>
  );
};

// Loan List section to display loans
const LoanListSection: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
        <div className="text-gray-700">User Details</div>
        <div className="text-gray-700">Customer Name</div>
        <div className="text-gray-700">Date</div>
        <div className="text-gray-700">Status</div>
        <div className="text-gray-700">Action</div>
      </div>
      <LoanList />
    </>
  );
};

// StatCard component to display individual stat blocks
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="flex">
      <div className="bg-green-900 w-fit h-full flex px-3 items-center rounded-l-lg">
        <Icon className="h-12 w-16" color="white" />
      </div>
      <div className="bg-white shadow-md rounded-r-lg p-6 flex flex-col items-center justify-center w-48">
        <h4 className="text-lg font-semibold mb-2">{label}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};
export default VerifierDashboard;
