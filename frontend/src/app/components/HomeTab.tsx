import { useEffect, useState } from "react";
import { BookMarked, TrendingUp, Users, Award } from "lucide-react";
import { Card } from "./ui/card";

const API = "http://127.0.0.1:5000/api";

interface HomeTabProps {
  user: any;
}

export default function HomeTab({ user }: HomeTabProps) {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API}/profile/${user.email}`)
      .then(res => res.json())
      .then(setProfile);

    fetch(`${API}/transactions/${user.email}`)
      .then(res => res.json())
      .then(setTransactions);

    fetch(`${API}/skills`)
      .then(res => res.json())
      .then(setSkills);
  }, [user]);

  if (!profile) {
    return <div className="p-6">Loading your library...</div>;
  }

  const stats = [
    {
      label: "Credits",
      value: profile.credits || 0,
      icon: Award,
      color: "bg-amber-500",
    },
    {
      label: "Skills Owned",
      value: profile.skills?.length || 0,
      icon: BookMarked,
      color: "bg-blue-500",
    },
    {
      label: "Skill Swaps",
      value: transactions.length,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Verified Exchanges",
      value: transactions.filter(t => t.verified).length,
      icon: Users,
      color: "bg-green-500",
    },
  ];

  // Recommended skills = highest income ones user doesn't already have
  const recommended = skills
    .filter(skill => !profile.skills?.includes(skill.name))
    .sort((a, b) => (b.avg_income || 0) - (a.avg_income || 0))
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6 pb-24">

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-serif mb-2">
          Welcome back, {profile.name || profile.email}
        </h1>
        <p className="text-amber-100">
          Your knowledge ledger is growing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 bg-white border-2 border-amber-200">
              <div className="flex items-center gap-3">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-amber-600">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-serif text-amber-900 mb-4">
          Recent Skill Swaps
        </h2>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((activity, index) => (
            <Card
              key={index}
              className="p-4 bg-white border-l-4 border-amber-500"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-amber-900">
                    Gave: {activity.skill_given}
                  </p>
                  <p className="text-sm text-amber-600">
                    Received: {activity.skill_received}
                  </p>
                </div>
                <span className="text-xs text-amber-500">
                  {activity.timestamp?.split(" ")[0]}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-serif text-amber-900 mb-4">
          Recommended for You
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recommended.map((skill, index) => (
            <Card
              key={index}
              className="p-5 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="mb-3">
                <h3 className="font-semibold text-amber-900">
                  {skill.name}
                </h3>
                <p className="text-sm text-amber-600">
                  Avg Income: ${skill.avg_income?.toLocaleString()}
                </p>
              </div>
              <button className="text-sm text-amber-700 font-semibold">
                Explore →
              </button>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
