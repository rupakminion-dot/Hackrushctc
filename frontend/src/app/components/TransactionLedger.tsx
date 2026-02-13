import { useState } from 'react';
import { ArrowRightLeft, Calendar, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

type TransactionStatus = 'completed' | 'pending' | 'cancelled';

interface Transaction {
  id: number;
  date: string;
  skillOffered: string;
  skillReceived: string;
  partner: string;
  status: TransactionStatus;
  duration: string;
}

export function TransactionLedger() {
  const [filter, setFilter] = useState<'all' | TransactionStatus>('all');

  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2026-02-10',
      skillOffered: 'React Development',
      skillReceived: 'UI/UX Design',
      partner: 'Alex Rodriguez',
      status: 'completed',
      duration: '4 weeks',
    },
    {
      id: 2,
      date: '2026-02-08',
      skillOffered: 'Python Programming',
      skillReceived: 'Data Visualization',
      partner: 'Priya Sharma',
      status: 'pending',
      duration: '3 weeks',
    },
    {
      id: 3,
      date: '2026-02-05',
      skillOffered: 'Graphic Design',
      skillReceived: 'Web Development',
      partner: 'Marcus Johnson',
      status: 'completed',
      duration: '6 weeks',
    },
    {
      id: 4,
      date: '2026-02-01',
      skillOffered: 'Content Writing',
      skillReceived: 'SEO Marketing',
      partner: 'Sarah Chen',
      status: 'completed',
      duration: '2 weeks',
    },
    {
      id: 5,
      date: '2026-01-28',
      skillOffered: 'Video Editing',
      skillReceived: 'Photography',
      partner: 'Yuki Tanaka',
      status: 'cancelled',
      duration: 'N/A',
    },
  ];

  const filteredTransactions = transactions.filter(
    (t) => filter === 'all' || t.status === filter
  );

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === 'completed').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    cancelled: transactions.filter((t) => t.status === 'cancelled').length,
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-amber-900 mb-2">Transaction Ledger</h1>
        <p className="text-amber-700">Track your skill exchange history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Total Swaps</p>
          <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <p className="text-sm text-green-600 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-900">{stats.completed}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200">
          <p className="text-sm text-yellow-600 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-white border-2 border-red-200">
          <p className="text-sm text-red-600 mb-1">Cancelled</p>
          <p className="text-3xl font-bold text-red-900">{stats.cancelled}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 text-amber-700'}
        >
          All
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 text-amber-700'}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 text-amber-700'}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'cancelled' ? 'default' : 'outline'}
          onClick={() => setFilter('cancelled')}
          className={filter === 'cancelled' ? 'bg-amber-700 hover:bg-amber-800' : 'border-amber-300 text-amber-700'}
        >
          Cancelled
        </Button>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-6 bg-white border-2 border-amber-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(transaction.status)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-amber-500" />
                    <span className="text-sm text-amber-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-amber-500" />
                    <span className="text-sm text-amber-700">{transaction.partner}</span>
                  </div>
                </div>
              </div>
              {getStatusBadge(transaction.status)}
            </div>

            {/* Skill Exchange */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-amber-600 mb-1">You Offered</p>
                  <p className="font-semibold text-amber-900">{transaction.skillOffered}</p>
                </div>
                <ArrowRightLeft className="text-amber-500 flex-shrink-0" size={24} />
                <div className="flex-1 text-right">
                  <p className="text-xs text-amber-600 mb-1">You Received</p>
                  <p className="font-semibold text-amber-900">{transaction.skillReceived}</p>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="mt-4 text-sm text-amber-600">
              <span className="font-semibold">Duration:</span> {transaction.duration}
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-amber-600 text-lg">No transactions found.</p>
          <p className="text-amber-500 text-sm mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
