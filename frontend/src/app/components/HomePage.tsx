import { BookShelf } from './BookShelf';
import { SkillBook } from './SkillBook';
import { Button } from './ui/button';
import { BookMarked, TrendingUp, Trophy, MapPin, DollarSign } from 'lucide-react';

interface HomePageProps {
  onNavigateToAuth: () => void;
  onNavigateToSkill: (skillName: string) => void;
}

const topSkills = [
  { title: 'Web Development', color: '#8B4513', level: 'Advanced', learners: 15420 },
  { title: 'Data Science', color: '#654321', level: 'Advanced', learners: 12890 },
  { title: 'Graphic Design', color: '#A0522D', level: 'Intermediate', learners: 18350 },
  { title: 'Digital Marketing', color: '#6B4423', level: 'Intermediate', learners: 9870 },
  { title: 'Video Editing', color: '#7B3F00', level: 'Advanced', learners: 11230 },
];

const profitableSkills = [
  { title: 'AI/ML Engineering', color: '#5D4037', level: 'Expert', learners: 8450 },
  { title: 'Blockchain Dev', color: '#6D4C41', level: 'Expert', learners: 6720 },
  { title: 'Cloud Architecture', color: '#8B6F47', level: 'Advanced', learners: 10540 },
  { title: 'Cybersecurity', color: '#704214', level: 'Advanced', learners: 7890 },
  { title: 'Mobile App Dev', color: '#6F4E37', level: 'Advanced', learners: 13210 },
];

const topProviders = [
  { rank: 1, name: 'Dr. Sarah Chen', skill: 'AI/ML Engineering', earnings: 125000, location: 'San Francisco, USA', students: 2341 },
  { rank: 2, name: 'Marcus Johnson', skill: 'Web Development', earnings: 98500, location: 'London, UK', students: 1876 },
  { rank: 3, name: 'Priya Sharma', skill: 'Data Science', earnings: 87200, location: 'Mumbai, India', students: 1654 },
  { rank: 4, name: 'Alex Rodriguez', skill: 'Graphic Design', earnings: 76800, location: 'Barcelona, Spain', students: 1523 },
  { rank: 5, name: 'Yuki Tanaka', skill: 'Video Editing', earnings: 69500, location: 'Tokyo, Japan', students: 1402 },
];

export function HomePage({ onNavigateToAuth, onNavigateToSkill }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50 py-12 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BookMarked size={48} className="text-amber-200" />
            <h1 className="text-6xl font-serif tracking-wider">SkilledIn</h1>
          </div>
          <p className="text-center text-amber-200 text-lg italic max-w-2xl mx-auto">
            A digital library where knowledge meets opportunity. Showcase, verify, and exchange skills in a community of learners and masters.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Top Skills Shelf */}
        <BookShelf title="Top Skills">
          {topSkills.map((skill, index) => (
            <SkillBook
              key={index}
              title={skill.title}
              color={skill.color}
              level={skill.level}
              learners={skill.learners}
              onClick={() => onNavigateToSkill(skill.title)}
            />
          ))}
        </BookShelf>

        {/* Most Profitable Skills Shelf */}
        <BookShelf title="Most Profitable Skills">
          {profitableSkills.map((skill, index) => (
            <SkillBook
              key={index}
              title={skill.title}
              color={skill.color}
              level={skill.level}
              learners={skill.learners}
              onClick={() => onNavigateToSkill(skill.title)}
            />
          ))}
        </BookShelf>

        {/* Leaderboard */}
        <div className="bg-amber-50 rounded-lg shadow-2xl p-8 border-4 border-amber-900/20 max-w-5xl mx-auto mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy className="text-amber-600" size={36} />
            <h2 className="text-4xl font-serif text-amber-900 text-center">Top Providers</h2>
          </div>
          
          <div className="space-y-4">
            {topProviders.map((provider) => (
              <div
                key={provider.rank}
                className="bg-white rounded-lg p-6 shadow-md border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-6">
                  {/* Rank Badge */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    provider.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    provider.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    provider.rank === 3 ? 'bg-amber-600 text-amber-100' :
                    'bg-amber-200 text-amber-800'
                  }`}>
                    #{provider.rank}
                  </div>

                  {/* Provider Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-amber-600 font-semibold">Provider</p>
                      <p className="text-lg font-semibold text-amber-900">{provider.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-semibold">Skill</p>
                      <p className="text-amber-800">{provider.skill}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-semibold flex items-center gap-1">
                        <DollarSign size={14} /> Earnings
                      </p>
                      <p className="text-amber-900 font-semibold">${provider.earnings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-semibold flex items-center gap-1">
                        <MapPin size={14} /> Location
                      </p>
                      <p className="text-amber-800 text-sm">{provider.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Reader CTA */}
        <div className="text-center mt-16 mb-8">
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg shadow-2xl p-12 max-w-2xl mx-auto">
            <BookMarked className="mx-auto mb-4 text-amber-200" size={48} />
            <h3 className="text-3xl font-serif text-amber-50 mb-4">Become a Reader</h3>
            <p className="text-amber-200 mb-6">
              Join our library of learners and masters. Access exclusive skills, connect with providers, and start your learning journey today.
            </p>
            <Button
              onClick={onNavigateToAuth}
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold text-lg px-8 py-6"
            >
              Enter the Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
