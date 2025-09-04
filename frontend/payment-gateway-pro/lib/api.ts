export type CreatePaymentRequest = {
  orderId: string; amount: number; currency: string; method: string;
};
export type PaymentResponse = {
  id: string; orderId: string; amount: number; currency: string;
  method: string; status: string; transactionRef?: string | null;
};

const API = process.env.NEXT_PUBLIC_PAYMENT_API || "http://localhost:8080/api";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export const APIClient = {
  createIntent: (p: CreatePaymentRequest) =>
    req<PaymentResponse>(`${API}/payments/intents`, { method: "POST", body: JSON.stringify(p) }),
  confirm: (id: string, transactionRef: string) =>
    req<PaymentResponse>(`${API}/payments/${id}/confirm`, { method: "POST", body: JSON.stringify({ transactionRef }) }),
};
