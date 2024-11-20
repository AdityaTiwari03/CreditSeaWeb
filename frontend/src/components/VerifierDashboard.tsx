import React, { useEffect, useState } from "react";
import LoanList from "./VerifierLL.tsx";
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

interface Loan {
  borrowers: number;
  activeusers: number;
  loanscount: number;
  casedisbursed: number;
}

const VerifierDashboard: React.FC = () => {
  const { officerId } = useParams<{ officerId: string }>();
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
        const updatedData = data.map((loan) => ({
          borrowers: loan.borrowUserCount,
          activeusers: loan.activeUserCount,
          loanscount: loan.approvedLoanCount,
          casedisbursed: loan.totalDisbursedloanAmount,
        }));

        setLoans(updatedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-gray-100 flex-1 overflow-scroll">
          <StatsSection loans={loans} />
          <ActivitySection />
          <LoanList />
        </div>
      </div>
    </div>
  );
};

const StatsSection: React.FC<{ loans: Loan[] }> = ({ loans }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <StatCard
        label="Loans"
        value={loans[0]?.loanscount.toString() || "0"}
        icon={FaUsers}
      />
      <StatCard
        label="Borrowers"
        value={loans[0]?.borrowers.toString() || "0"}
        icon={FaTachometerAlt}
      />
      <StatCard
        label="Cash Disbursed"
        value={loans[0]?.casedisbursed.toString() || "0"}
        icon={FaMoneyBill}
      />
      <StatCard label="Savings" value="450,000" icon={FaUndo} />
      <StatCard label="Repaid Loans" value="30" icon={FaFileInvoiceDollar} />
      <StatCard label="Cash Received" value="1,000,000" icon={FaFileAlt} />
    </div>
  );
};

const ActivitySection: React.FC = () => {
  return (
    <div className="flex justify-between items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
      <div className="text-gray-700">User Recent Activity</div>
      <div className="text-gray-700">Customer Name</div>
      <div className="text-gray-700">Date</div>
      <div className="text-gray-700">Status</div>
      <div className="text-gray-700">Action</div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="flex">
      <div className="bg-green-900 w-fit h-full flex px-3 items-center">
        <Icon className="h-12 w-16" color="white" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center w-48">
        <h4 className="text-lg font-semibold mb-2">{label}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default VerifierDashboard;
