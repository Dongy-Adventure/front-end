'use client';
<<<<<<< HEAD

=======
>>>>>>> 463bd1741975b5e3d45ca11c0d06c4ee1c3edca0
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/seller/transaction/Card';
import Return from '@/components/Return';

interface Transaction {
  id: string;
  productName: string;
  amount: number;
  date: string;
}

<<<<<<< HEAD
const transactionDummy = [
=======
const transactonDummy = [
>>>>>>> 463bd1741975b5e3d45ca11c0d06c4ee1c3edca0
  {
    id: '1',
    productName: 'แว่นไอ่ดอง',
    amount: 20000.0,
    date: '2025-02-02T00:00:00Z',
  },
  {
    id: '2',
    productName: 'นาฬิกาไอ่ดอง',
    amount: 100000.0,
    date: '2025-02-01T00:00:00Z',
  },
  {
    id: '3',
    productName: 'โทรศัพท์ไอ่ดอง',
    amount: 50000.0,
    date: '2025-01-31T00:00:00Z',
  },
  {
    id: '4',
    productName: 'Test',
    amount: 100.0,
    date: '2025-01-31T00:00:00Z',
  },
];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // useEffect(() => {
  //   // Fetch transaction data (replace with actual API endpoint)
  //   axios.get("/api/transactions")
  //     .then(response => setTransactions(response.data))
  //     .catch(error => console.error("Error fetching transactions:", error));
  // }, []);

  useEffect(() => {
    setTransactions(transactionDummy);
  }, []);

  return (
    <section className="p-12 text-black">
      <Return />
      <div className="text-2xl font-bold pb-8 grid place-items-center">
        Transaction History
      </div>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 overflow-scroll">
          {transactions.map((transaction: Transaction) => (
            <Card
              key={transaction.id}
              className="p-4 shadow-lg text-black"
            >
              <CardContent>
                <strong>Product:</strong> {transaction.productName}
                <strong>Amount:</strong> {transaction.amount.toFixed(2)} Bath
                <strong>Date:</strong>
                {new Date(transaction.date).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
