import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoanCard from "./Card.tsx";

// Define the loan type
interface Loan {
  id: number;
  officer: string;
  amount: string;
  date: string;
  status: string;
}

const LoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function loadLoans() {
      try {
        const response = await fetch(
          `https://aoushadhi.in/loans/?role=${"admin"}`
        );
        if (!response.ok) throw new Error("Could not fetch loan data");

        const data = await response.json();
        const loanData = data.map((loan) => ({
          id: loan._id,
          officer: loan.reasonForLoan,
          amount: loan.fullName,
          date: new Date(loan.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          status: loan.status,
        }));

        setLoans(loanData);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading loans...</div>;
  if (error) return <div>Error occurred: {error}</div>;

  console.log("Admin Loan List", loans);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loans.length > 0 ? (
        loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} actions={true} role="admin" />
        ))
      ) : (
        <div>No loans available</div>
      )}
    </div>
  );
};

export default LoanList;
