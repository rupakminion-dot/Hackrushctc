import { BookMarked, TrendingUp, Users, Award } from 'lucide-react';
import { Card } from './ui/card';

export function HomeTab() {
  const recentActivities = [
    { id: 1, type: 'learned', skill: 'React Fundamentals', time: '2 hours ago' },
    { id: 2, type: 'swap', skill: 'Python for Data Science', with: 'Marcus J.', time: '5 hours ago' },
    { id: 3, type: 'achievement', skill: 'Web Development', badge: 'Completed Module 5', time: '1 day ago' },
    { id: 4, type: 'learned', skill: 'UI/UX Design Basics', time: '2 days ago' },
  ];

  const stats = [
    { label: 'Skills Learning', value: '8', icon: BookMarked, color: 'bg-blue-500' },
    { label: 'Skills Teaching', value: '3', icon: Users, color: 'bg-green-500' },
    { label: 'Skill Swaps', value: '12', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Achievements', value: '24', icon: Award, color: 'bg-amber-500' },
  ];

  const recommendedSkills = [
    { title: 'Advanced TypeScript', level: 'Advanced', match: '95%' },
    { title: 'Cloud Computing Basics', level: 'Beginner', match: '88%' },
    { title: 'Machine Learning Intro', level: 'Intermediate', match: '82%' },
  ];

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-serif mb-2">Welcome to Your Library</h1>
        <p className="text-amber-100">Continue your learning journey and explore new skills</p>
      </div>

      {/* Stats Grid */}
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
                  <p className="text-2xl font-bold text-amber-900">{stat.value}</p>
                  <p className="text-xs text-amber-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-serif text-amber-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card key={activity.id} className="p-4 bg-white border-l-4 border-amber-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  {activity.type === 'learned' && (
                    <>
                      <p className="font-semibold text-amber-900">Studied: {activity.skill}</p>
                      <p className="text-sm text-amber-600">Learning progress updated</p>
                    </>
                  )}
                  {activity.type === 'swap' && (
                    <>
                      <p className="font-semibold text-amber-900">Skill Swap: {activity.skill}</p>
                      <p className="text-sm text-amber-600">Exchanged with {activity.with}</p>
                    </>
                  )}
                  {activity.type === 'achievement' && (
                    <>
                      <p className="font-semibold text-amber-900">{activity.skill}</p>
                      <p className="text-sm text-amber-600">{activity.badge}</p>
                    </>
                  )}
                </div>
                <span className="text-xs text-amber-500">{activity.time}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Skills */}
      <div>
        <h2 className="text-2xl font-serif text-amber-900 mb-4">Recommended for You</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendedSkills.map((skill, index) => (
            <Card key={index} className="p-5 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 hover:border-amber-400 transition-all cursor-pointer">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-amber-900">{skill.title}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {skill.match} match
                  </span>
                </div>
                <p className="text-sm text-amber-600">{skill.level}</p>
              </div>
              <button className="text-sm text-amber-700 hover:text-amber-900 font-semibold">
                Explore →
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
