import { useState } from 'react';
import { Search, Filter, Star, Users, DollarSign } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function SearchSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Business', 'Data Science'];

  const skills = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      provider: 'Dr. Sarah Chen',
      rating: 4.9,
      students: 2341,
      price: 499,
      category: 'Development',
      level: 'Beginner to Advanced',
      description: 'Complete web development course from HTML to React',
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      provider: 'Alex Rodriguez',
      rating: 4.8,
      students: 1523,
      price: 399,
      category: 'Design',
      level: 'Intermediate',
      description: 'Learn modern UI/UX design principles and tools',
    },
    {
      id: 3,
      title: 'Data Science with Python',
      provider: 'Priya Sharma',
      rating: 4.9,
      students: 1654,
      price: 549,
      category: 'Data Science',
      level: 'Intermediate',
      description: 'Master data analysis, visualization, and machine learning',
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      provider: 'Marcus Johnson',
      rating: 4.7,
      students: 987,
      price: 299,
      category: 'Marketing',
      level: 'Beginner',
      description: 'Learn SEO, social media, and content marketing',
    },
    {
      id: 5,
      title: 'Business Analytics',
      provider: 'Yuki Tanaka',
      rating: 4.8,
      students: 876,
      price: 449,
      category: 'Business',
      level: 'Advanced',
      description: 'Data-driven decision making for business leaders',
    },
    {
      id: 6,
      title: 'Mobile App Development',
      provider: 'Dr. Sarah Chen',
      rating: 4.9,
      students: 1432,
      price: 599,
      category: 'Development',
      level: 'Advanced',
      description: 'Build native iOS and Android applications',
    },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-amber-900 mb-2">Search Skills</h1>
        <p className="text-amber-700">Discover and learn from expert providers</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" size={20} />
        <Input
          type="text"
          placeholder="Search for skills, providers, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-amber-300 focus:border-amber-600"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'border-amber-300 text-amber-700 hover:bg-amber-50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-amber-600">
        Found {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
      </p>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="p-6 bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer">
            <div className="space-y-4">
              {/* Title and Category */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-amber-900 leading-tight flex-1">
                    {skill.title}
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                    {skill.category}
                  </span>
                </div>
                <p className="text-sm text-amber-600">{skill.provider}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-amber-700 line-clamp-2">{skill.description}</p>

              {/* Level */}
              <p className="text-xs text-amber-600">Level: {skill.level}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-amber-700">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span>{skill.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{skill.students.toLocaleString()}</span>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                <div className="flex items-center gap-1 text-amber-900 font-semibold">
                  <DollarSign size={18} />
                  <span>{skill.price}</span>
                </div>
                <Button size="sm" className="bg-amber-700 hover:bg-amber-800 text-white">
                  Enroll Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-amber-600 text-lg">No skills found matching your search.</p>
          <p className="text-amber-500 text-sm mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
