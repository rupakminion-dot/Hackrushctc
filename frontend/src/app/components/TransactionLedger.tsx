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

type TransactionStatus = "completed" | "pending" | "cancelled";

interface Transaction {
  id: number;
  timestamp: string;
  skill_given: string;
  skill_received: string;
  partner: string;
  status: TransactionStatus;
  duration?: string;
}

interface Props {
  user: any;
}

const API = "http://127.0.0.1:5000/api";

export default function TransactionLedger({ user }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | TransactionStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/transactions/${user.email}`
        );

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load transaction ledger.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const filteredTransactions = transactions.filter(
    (t) => filter === "all" || t.status === filter
  );

  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === "completed").length,
    pending: transactions.filter((t) => t.status === "pending").length,
    cancelled: transactions.filter((t) => t.status === "cancelled").length,
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-600" size={20} />;
      case "pending":
        return <Clock className="text-yellow-600" size={20} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const styles = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 pb-24">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-amber-900 mb-2">
          Transaction Ledger
        </h1>
        <p className="text-amber-700">
          Track your skill exchange history
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-amber-700 text-center">
          Loading your ledger...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-center font-semibold">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Swaps" value={stats.total} color="blue" />
            <StatCard label="Completed" value={stats.completed} color="green" />
            <StatCard label="Pending" value={stats.pending} color="yellow" />
            <StatCard label="Cancelled" value={stats.cancelled} color="red" />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "completed", "pending", "cancelled"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                onClick={() =>
                  setFilter(f as "all" | TransactionStatus)
                }
                className={
                  filter === f
                    ? "bg-amber-700 hover:bg-amber-800 text-white"
                    : "border-amber-300 text-amber-700"
                }
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {/* Transactions */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="p-6 bg-white border-2 border-amber-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(transaction.status)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-amber-500" />
                        <span className="text-sm text-amber-600">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-amber-500" />
                        <span className="text-sm text-amber-700">
                          {transaction.partner}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-amber-600 mb-1">
                        You Gave
                      </p>
                      <p className="font-semibold text-amber-900">
                        {transaction.skill_given}
                      </p>
                    </div>

                    <ArrowRightLeft
                      className="text-amber-500"
                      size={24}
                    />

                    <div className="text-right">
                      <p className="text-xs text-amber-600 mb-1">
                        You Received
                      </p>
                      <p className="font-semibold text-amber-900">
                        {transaction.skill_received}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-amber-600 text-lg">
                  No transactions found.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* Reusable Stat Card */
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colorMap: any = {
    blue: "from-blue-50 border-blue-200 text-blue-900",
    green: "from-green-50 border-green-200 text-green-900",
    yellow: "from-yellow-50 border-yellow-200 text-yellow-900",
    red: "from-red-50 border-red-200 text-red-900",
  };

  return (
    <Card
      className={`p-4 bg-gradient-to-br ${colorMap[color]}`}
    >
      <p className="text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </Card>
  );
}
