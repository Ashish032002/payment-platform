'use client';
import { useState } from "react";
import { APIClient, type PaymentResponse } from "../lib/api";

export default function Page() {
  const [orderId, setOrderId] = useState("ORD-" + Math.floor(Math.random()*10000));
  const [amount, setAmount] = useState("499.00");
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState("CARD");
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const create = async () => {
    setErr(null); setLoading(true);
    try {
      const data = await APIClient.createIntent({
        orderId, amount: parseFloat(amount), currency, method
      });
      setPayment(data);
    } catch (e: any) { setErr(e.message || String(e)); }
    finally { setLoading(false); }
  };

  const confirm = async () => {
    if (!payment?.id) return;
    setErr(null); setLoading(true);
    try {
      const data = await APIClient.confirm(payment.id, "TXN-" + Date.now());
      setPayment(data);
    } catch (e: any) { setErr(e.message || String(e)); }
    finally { setLoading(false); }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Payment Gateway</h1>

      <div className="grid gap-3">
        <input className="border rounded p-2" value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Order ID" />
        <input className="border rounded p-2" value={amount}  onChange={e=>setAmount(e.target.value)} type="number" step="0.01" placeholder="Amount" />
        <select className="border rounded p-2" value={currency} onChange={e=>setCurrency(e.target.value)}>
          <option>INR</option><option>USD</option><option>EUR</option>
        </select>
        <select className="border rounded p-2" value={method} onChange={e=>setMethod(e.target.value)}>
          <option>UPI</option><option>CARD</option><option>NETBANKING</option>
        </select>

        <div className="flex gap-2">
          <button onClick={create}  className="bg-indigo-600 text-white rounded px-4 py-2" disabled={loading}>Create Intent</button>
          <button
            onClick={confirm}
            className="bg-gray-200 rounded px-4 py-2"
            disabled={!payment || payment.status !== "PENDING" || loading}
          >
            Confirm
          </button>
        </div>
      </div>

      {err && <div className="text-red-600 text-sm">{err}</div>}

      {/* ---- SMALL STATUS PANEL (no raw JSON) ---- */}
      {payment && (
        <div className="bg-white rounded-xl border shadow p-4">
          <div className="text-sm text-gray-500 mb-2">Payment status</div>
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {payment.status === "CONFIRMED" ? "Payment confirmed" : "Payment created"}
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              payment.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {payment.status}
            </span>
          </div>

          {/* If you want to hide everything, delete the block below */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-700">
            <div><span className="text-gray-500">Order:</span> {payment.orderId}</div>
            <div><span className="text-gray-500">Method:</span> {payment.method}</div>
            <div><span className="text-gray-500">Amount:</span> {payment.amount} {payment.currency}</div>
            {payment.transactionRef && (
              <div className="col-span-2">
                <span className="text-gray-500">Txn Ref:</span> {payment.transactionRef}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
