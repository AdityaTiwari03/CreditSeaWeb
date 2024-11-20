import React, { useState } from "react";
import "./App.css";
import LoanList from "./components/LL.tsx";
import Modal from "./components/Model.tsx";

// Define the form data structure
interface LoanFormData {
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
}

const App: React.FC = () => {
  const [showLoanForm, setShowLoanForm] = useState(false); // To toggle the loan form
  const [formData, setFormData] = useState<LoanFormData>({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress: "",
  });

  // Function to toggle the form on "Get a Loan" click
  const handleGetLoanClick = () => {
    setShowLoanForm(true);
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make an API call on form submission
    const idNumber = 12140090; // Make sure idNumber is present in formData
    const apiUrl = `https://aoushadhi.in/loans?idNumber=${idNumber}`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("Loan application submitted successfully!");
        setShowLoanForm(false); // Close the modal after successful submission
      } else {
        alert("Error submitting loan application");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the loan application.");
    }
  };
  const [activeTab, setActiveTab] = useState<string>("borrow");

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="p-6 bg-gray-100 flex justify-center">
        <div className="p-6 max-w-4xl w-full">
          {/* Balance Display Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-800 text-white p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c1.065 0 2.09.144 3.065.418a5 5 0 01-6.13 6.13A8.035 8.035 0 0112 8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500 uppercase text-sm font-semibold">
                  Deficit
                </h3>
                <p className="text-green-800 text-2xl font-bold">₦ 0.0</p>
              </div>
            </div>

            {/* Get A Loan Button */}
            <button
              onClick={handleGetLoanClick}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Get A Loan
            </button>
          </div>

          {/* Action Buttons (Tabs) */}
          <div className="flex space-x-2 mb-4">
            <div className="flex w-full">
              <button
                className={`flex-1 py-2 px-4 rounded-lg shadow ${
                  activeTab === "borrow"
                    ? "bg-gray-300 text-black font-bold"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setActiveTab("borrow")}
              >
                Borrow Cash
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg shadow ${
                  activeTab === "transact"
                    ? "bg-gray-300 text-black font-bold"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setActiveTab("transact")}
              >
                Transact
              </button>
              <button
                className={`flex-1 py-2 rounded-lg shadow ${
                  activeTab === "deposit"
                    ? "bg-gray-300 text-black font-bold"
                    : "bg-white text-gray-700 border"
                }`}
                onClick={() => setActiveTab("deposit")}
              >
                Deposit Cash
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 shadow-xl">
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Search for loans"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 21l6-6m0 0l6-6m-6 6l6 6m-6-6l-6-6"
              />
            </svg>
          </div>

          {/* Conditionally Render the Content Based on Active Tab */}
          <div className="container max-w-5xl mx-auto px-4 py-8">
            {activeTab === "borrow" ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-semibold">Applied Loans</h1>
                </div>
                <div className="flex justify-between items-center border-b p-4 hover:bg-gray-100 transition-all duration-200">
                  <div className="text-gray-700">Officer</div>
                  <div className="text-gray-700">Amount</div>
                  <div className="text-gray-700">Date Applied</div>
                  <div className="text-gray-700">Status</div>
                </div>
                <LoanList />
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <h1 className="text-3xl font-semibold text-gray-500">
                  Coming Soon
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Loan Application Modal */}
      <Modal isVisible={showLoanForm} onClose={() => setShowLoanForm(false)}>
        <form onSubmit={handleSubmit} className="p-8  space-y-6">
          <h2 className="text-2xl font-bold mb-6">APPLY FOR A LOAN</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name as it appears on bank account"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="number"
              name="loanAmount"
              placeholder="How much do you need?"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="loanTenure"
              placeholder="Loan tenure (in months)"
              value={formData.loanTenure}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="text"
              name="employmentStatus"
              placeholder="Employment status"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              name="reasonForLoan"
              placeholder="Reason for loan"
              value={formData.reasonForLoan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            ></textarea>
            <input
              type="text"
              name="employmentAddress"
              placeholder="Employment address"
              value={formData.employmentAddress}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                required
              />
              <span className="text-gray-700">
                I have read the important information and accept the terms
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
                required
              />
              <span className="text-gray-700">
                Any personal and credit information obtained may be disclosed...
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default App;
