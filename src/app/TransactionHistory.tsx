'use client';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import axios from "axios";
import { Icon } from "@iconify/react";


interface Transaction {
  id: string;
  productName: string;
  amount: number;
  date: string;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      productName: "แว่นไอ่ดอง",
      amount: 20000.00,
      date: "2025-02-02T00:00:00Z",
    },
    {
      id: "2",
      productName: "นาฬิกาไอ่ดอง",
      amount: 100000.00,
      date: "2025-02-01T00:00:00Z",
    },
    {
      id: "3",
      productName: "โทรศัพท์ไอ่ดอง",
      amount: 50000.00,
      date: "2025-01-31T00:00:00Z",
    },
  ]);

  // useEffect(() => {
  //   // Fetch transaction data (replace with actual API endpoint)
  //   axios.get("/api/transactions")
  //     .then(response => setTransactions(response.data))
  //     .catch(error => console.error("Error fetching transactions:", error));
  // }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 shadow-lg text-black">
              <CardContent>
                <p><strong>Product:</strong> {transaction.productName}</p>
                <p><strong>Amount:</strong> {transaction.amount.toFixed(2)} Bath</p>
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Button className="mt-4" onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
}