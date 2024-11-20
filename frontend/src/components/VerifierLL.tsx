import React, { useEffect, useState } from "react";
import LoanCard from "./Card.tsx";

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
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          `https://aoushadhi.in/loans/?role=${"verifier"}`
        );
        // console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }

        const data = await response.json();
        // Mapping backend data to frontend format
        // console.log(data)
        const updated_data = data.map((loan) => ({
          id: loan._id, // Using _id from backend as id
          officer: loan.reasonForLoan, // Mapping loanOfficer to officer
          amount: loan.fullName,
          date: new Date(loan.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }), // Formatting date in Indian format
          status: loan.status, // Mapping status
        }));
        console.log(updated_data);
        setLoans(updated_data); // Assuming the API returns an array of loans
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []); // Run effect when officerId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("Verifier Loan List", loans);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} actions={true} role="verifier" />
      ))}
    </div>
  );
};

export default LoanList;
