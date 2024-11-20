import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoanCard from "./Card.tsx";

// Define the Loan type
interface Loan {
  id: number;
  officer: string;
  amount: string;
  date: string;
  status: string;
}

const LoanList: React.FC = () => {
  const { officerId } = useParams<{ officerId: string }>(); // Access officerId from URL
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch loans on component mount
  useEffect(() => {
    async function loadLoans() {
      try {
        const response = await fetch(
          `https://aoushadhi.in/loans/id?idNumber=${12140090}`
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve loan data");
        }

        const result = await response.json();

        // Transforming API response to match component requirements
        const transformedLoans = result.map((loan) => ({
          id: loan._id, // Use _id for the loan id
          officer: loan.loanOfficer, // Mapping backend loanOfficer to officer
          amount: new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(loan.loanAmount), // Format loanAmount into INR currency
          date: new Date(loan.createdAt).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }), // Date formatting for Indian locale
          status: loan.status, // Direct mapping of loan status
        }));

        setLoans(transformedLoans); // Update state with transformed data
      } catch (error: any) {
        setError(error.message); // Capture any fetch errors
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    }

    loadLoans(); // Invoke function when component mounts
  }, []); // Empty dependency array to mimic componentDidMount behavior

  // Render loading state
  if (loading) return <div>Loading...</div>;

  // Render error message if fetch fails
  if (error) return <div>Error: {error}</div>;

  // Debugging
  console.log("Loans fetched:", loans);

  // Render list of LoanCard components if loans exist
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </div>
  );
};

export default LoanList;
