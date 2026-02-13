import { useEffect, useState } from "react";
import { Search, Star, Users, DollarSign } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const API = "http://127.0.0.1:5000/api";

interface Skill {
  id: number;
  name: string;
  category?: string;
  description?: string;
  level?: string;
  rating?: number;
  students?: number;
  price?: number;
  provider?: string;
}

export default function SearchSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/skills`);
        if (!res.ok) throw new Error("Failed to fetch skills");

        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load skills. Check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Dynamic categories from backend
  const categories = [
    "All",
    ...Array.from(new Set(skills.map((s) => s.category).filter(Boolean) as string[])),
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.provider?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 pb-24">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-amber-900 mb-2">
          Search Skills
        </h1>
        <p className="text-amber-700">
          Discover and learn from expert providers
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search for skills, providers, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-amber-300 focus:border-amber-600"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-amber-700 hover:bg-amber-800 text-white"
                : "border-amber-300 text-amber-700 hover:bg-amber-50"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-amber-700 text-center">Searching the archives...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <>
          <p className="text-sm text-amber-600">
            Found {filteredSkills.length}{" "}
            {filteredSkills.length === 1 ? "skill" : "skills"}
          </p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <Card
                key={skill.id}
                className="p-6 bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="space-y-4">

                  {/* Title */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-amber-900">
                        {skill.name}
                      </h3>
                      {skill.category && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          {skill.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-amber-600">
                      {skill.provider || "Unknown Provider"}
                    </p>
                  </div>

                  {/* Description */}
                  {skill.description && (
                    <p className="text-sm text-amber-700 line-clamp-2">
                      {skill.description}
                    </p>
                  )}

                  {/* Level */}
                  {skill.level && (
                    <p className="text-xs text-amber-600">
                      Level: {skill.level}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-amber-700">
                    {skill.rating && (
                      <div className="flex items-center gap-1">
                        <Star
                          className="text-yellow-500 fill-yellow-500"
                          size={16}
                        />
                        <span>{skill.rating}</span>
                      </div>
                    )}

                    {skill.students && (
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{skill.students.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  {skill.price && (
                    <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                      <div className="flex items-center gap-1 text-amber-900 font-semibold">
                        <DollarSign size={18} />
                        <span>{skill.price}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        Enroll
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-amber-600 text-lg">
                No skills found.
              </p>
              <p className="text-amber-500 text-sm mt-2">
                Try adjusting your search.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
