import React, { useState } from 'react';

interface PaymentResult {
  originalAmount: number;
  commission: number;
  additionalFee: number;
  totalAmount: number;
}

const calculatePaymentDetails = (paymentType: string, amount: number): PaymentResult => {
  let commissionRate = 0;
  let threshold = 0;
  let additionalFee = 0;

  switch (paymentType) {
    case 'CREDIT_CARD':
      commissionRate = 0.03;
      threshold = 1000;
      additionalFee = 10;
      break;
    case 'DEBIT_CARD':
      commissionRate = 0.01;
      threshold = 500;
      additionalFee = 5;
      break;
    case 'PAYPAL':
      commissionRate = 0.02;
      threshold = 750;
      additionalFee = 7;
      break;
    case 'BITCOIN':
      commissionRate = 0.015;
      threshold = 2000;
      additionalFee = 15;
      break;
  }

  const commission = amount * commissionRate;
  const fee = amount > threshold ? additionalFee : 0;
  const total = amount + commission + fee;

  return {
    originalAmount: amount,
    commission: commission,
    additionalFee: fee,
    totalAmount: total
  };
};

const PaymentForm: React.FC = () => {
  const [paymentType, setPaymentType] = useState('CREDIT_CARD');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<PaymentResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentResult = calculatePaymentDetails(paymentType, parseFloat(amount));
    setResult(paymentResult);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Payment Processor</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="PAYPAL">PayPal</option>
            <option value="BITCOIN">Bitcoin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Process Payment
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Payment Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Original Amount:</span>
              <span>${result.originalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Commission:</span>
              <span>${result.commission.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Fee:</span>
              <span>${result.additionalFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total Amount:</span>
              <span>${result.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;