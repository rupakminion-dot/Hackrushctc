import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const API = "http://127.0.0.1:5000/api";

interface Transaction {
  email: string;
  skillOffered: string;
  skillReceived: string;
  partner: string;
  status?: string;
  duration?: string;
  timestamp?: string;
}

interface Props {
  user: any;
}

export default function TransactionLedger({ user }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API}/transactions/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  }, [user]);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  const getStatusIcon = (status?: string) => {
    const safeStatus = status || "pending";

    switch (safeStatus) {
      case "completed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusBadge = (status?: string) => {
    const safeStatus = status || "pending";

    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[safeStatus] || styles["pending"]
        }`}
      >
        {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <h1 className="text-3xl font-serif text-amber-900">
        Transaction Ledger
      </h1>

      <div className="flex gap-2">
        {["all", "completed", "pending", "cancelled"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((t, index) => (
          <Card key={index} className="p-6 bg-white border-2 border-amber-200">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(t.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="text-sm">
                      {t.timestamp
                        ? new Date(t.timestamp).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span className="text-sm">{t.partner}</span>
                  </div>
                </div>
              </div>

              {getStatusBadge(t.status)}
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-amber-600">You Offered</p>
                  <p className="font-semibold">{t.skillOffered}</p>
                </div>

                <ArrowRightLeft size={24} />

                <div className="text-right">
                  <p className="text-xs text-amber-600">You Received</p>
                  <p className="font-semibold">{t.skillReceived}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm text-amber-600">
              Duration: {t.duration || "N/A"}
            </div>
          </Card>
        ))}

        {filteredTransactions.length === 0 && (
          <p className="text-amber-600 text-center">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}
