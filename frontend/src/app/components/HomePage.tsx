import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import LuxuryBook from "./LuxuryBook";
import { Button } from "./ui/button";
import { BookMarked, Trophy, MapPin, DollarSign } from "lucide-react";
import SkillBook from "./SkillBook";

const API = "http://127.0.0.1:5000/api";

interface Skill {
  id: number;
  name: string;
  category?: string;
  avg_income?: number;
  demand_index?: number;
  providers?: number;
  growth?: string;
}

interface Provider {
  email: string;
  name?: string;
  location?: string;
  credits?: number;
  earnings?: number;
}

interface HomePageProps {
  onNavigateToAuth: () => void;
  onNavigateToSkill: (skillName: string) => void;
}

export default function HomePage({
  onNavigateToAuth,
  onNavigateToSkill,
}: HomePageProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [skillsRes, providersRes] = await Promise.all([
          fetch(`${API}/skills`),
          fetch(`${API}/leaderboard`),
        ]);

        if (!skillsRes.ok || !providersRes.ok) {
          throw new Error("Backend not responding");
        }

        const skillsData = await skillsRes.json();
        const providersData = await providersRes.json();

        setSkills(skillsData);
        setProviders(providersData);
      } catch (err) {
        console.error(err);
        setError("Unable to load library data. Ensure Flask backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const topSkills = [...skills]
    .sort((a, b) => (b.demand_index || 0) - (a.demand_index || 0))
    .slice(0, 5);

  const profitableSkills = [...skills]
    .sort((a, b) => (b.avg_income || 0) - (a.avg_income || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">

      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 py-12 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BookMarked size={48} className="text-amber-200" />
            <h1 className="text-6xl font-serif tracking-wider">
              SkilledIn
            </h1>
          </div>
          <p className="text-amber-200 italic max-w-2xl mx-auto">
            A digital library where knowledge meets opportunity.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">

        {/* Loading */}
        {loading && (
          <div className="text-center text-amber-700 text-lg">
            Arranging the shelves...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Top Skills */}
            <BookShelf title="Top Skills">
  {topSkills.map((skill) => (
    <SkillBook
      key={skill.id}
      skill={skill}
      color="#8B4513"
      onClick={() => onNavigateToSkill(skill.name)}
    />
  ))}
</BookShelf>


            {/* Most Profitable Skills */}
            <BookShelf title="Most Profitable Skills">
  {profitableSkills.map((skill) => (
    <SkillBook
      key={skill.id}
      skill={skill}
      color="#5D4037"
      onClick={() => onNavigateToSkill(skill.name)}
    />
  ))}
</BookShelf>


            {/* Leaderboard */}
            <div className="bg-amber-50 rounded-lg shadow-2xl p-8 border-4 border-amber-900/20 max-w-5xl mx-auto mt-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Trophy className="text-amber-600" size={36} />
                <h2 className="text-4xl font-serif text-amber-900">
                  Top Providers
                </h2>
              </div>

              {providers.length === 0 ? (
                <p className="text-center text-amber-700">
                  No providers ranked yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {providers.slice(0, 5).map((provider, index) => (
                    <div
                      key={provider.email}
                      className="bg-white rounded-lg p-6 shadow-md border-2 border-amber-200"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold text-xl">
                          #{index + 1}
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 flex-1">
                          <Info label="Provider" value={provider.name || provider.email} />
                          <Info label="Credits" value={provider.credits || 0} />
                          <Info
                            label="Earnings"
                            value={`$${provider.earnings?.toLocaleString() || 0}`}
                            icon={<DollarSign size={14} />}
                          />
                          <Info
                            label="Location"
                            value={provider.location || "N/A"}
                            icon={<MapPin size={14} />}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="text-center mt-16 mb-8">
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg shadow-2xl p-12 max-w-2xl mx-auto">
            <BookMarked className="mx-auto mb-4 text-amber-200" size={48} />
            <h3 className="text-3xl font-serif text-amber-50 mb-4">
              Become a Reader
            </h3>
            <p className="text-amber-200 mb-6">
              Join our library of learners and masters.
            </p>
            <Button
              onClick={onNavigateToAuth}
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-amber-950"
            >
              Enter the Library
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* Reusable Info Block */
function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-amber-600 font-semibold flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="text-amber-900">{value}</p>
    </div>
  );
}
