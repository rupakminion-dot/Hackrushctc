import { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, BookOpen, Edit2, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function AccountDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Reader',
    email: 'john.reader@skilledin.com',
    mobile: '1234567890',
    location: 'New York, USA',
    bio: 'Passionate learner and educator, specializing in web development and design.',
    joinDate: 'January 15, 2026',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Skills Learning', value: 8, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Skills Teaching', value: 3, icon: Award, color: 'text-green-600' },
    { label: 'Total Swaps', value: 12, icon: Award, color: 'text-purple-600' },
    { label: 'Achievements', value: 24, icon: Award, color: 'text-amber-600' },
  ];

  const learningSkills = [
    { name: 'React Development', progress: 75, provider: 'Dr. Sarah Chen' },
    { name: 'Data Science', progress: 45, provider: 'Priya Sharma' },
    { name: 'UI/UX Design', progress: 60, provider: 'Alex Rodriguez' },
  ];

  const teachingSkills = [
    { name: 'JavaScript Basics', students: 45, rating: 4.8 },
    { name: 'Responsive Web Design', students: 32, rating: 4.9 },
    { name: 'Git & GitHub', students: 28, rating: 4.7 },
  ];

  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-amber-900 mb-2">Account Details</h1>
          <p className="text-amber-700">Manage your profile and learning journey</p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-amber-700 hover:bg-amber-800 text-white"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="outline" className="border-amber-300 text-amber-700">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-amber-700 hover:bg-amber-800 text-white">
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-700 to-amber-600 flex items-center justify-center">
              <User className="text-white" size={64} />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <div>
                  <Label htmlFor="name" className="text-amber-900">Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="border-amber-300"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-amber-900">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="border-amber-300"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile" className="text-amber-900">Mobile</Label>
                  <Input
                    id="mobile"
                    value={editedProfile.mobile}
                    onChange={(e) => setEditedProfile({ ...editedProfile, mobile: e.target.value })}
                    className="border-amber-300"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-amber-900">Location</Label>
                  <Input
                    id="location"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="border-amber-300"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-amber-900">Bio</Label>
                  <Input
                    id="bio"
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    className="border-amber-300"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-amber-900">{profile.name}</h2>
                <div className="space-y-2 text-amber-700">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-amber-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-amber-500" />
                    <span>{profile.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-amber-500" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                <p className="text-amber-700 italic">{profile.bio}</p>
                <p className="text-sm text-amber-500">Member since {profile.joinDate}</p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 bg-white border-2 border-amber-200 text-center">
              <Icon className={`mx-auto mb-2 ${stat.color}`} size={32} />
              <p className="text-2xl font-bold text-amber-900">{stat.value}</p>
              <p className="text-xs text-amber-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Learning Skills */}
      <div>
        <h3 className="text-2xl font-serif text-amber-900 mb-4">Currently Learning</h3>
        <div className="space-y-4">
          {learningSkills.map((skill, index) => (
            <Card key={index} className="p-4 bg-white border-2 border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-amber-900">{skill.name}</h4>
                  <p className="text-sm text-amber-600">Provider: {skill.provider}</p>
                </div>
                <span className="text-sm font-semibold text-amber-700">{skill.progress}%</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Teaching Skills */}
      <div>
        <h3 className="text-2xl font-serif text-amber-900 mb-4">Skills You Teach</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {teachingSkills.map((skill, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
              <h4 className="font-semibold text-amber-900 mb-3">{skill.name}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-amber-700">
                  <span className="font-semibold">{skill.students}</span> students
                </p>
                <p className="text-amber-700">
                  Rating: <span className="font-semibold text-yellow-600">★ {skill.rating}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
