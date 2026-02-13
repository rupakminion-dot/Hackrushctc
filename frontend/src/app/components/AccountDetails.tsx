import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

const API = "http://127.0.0.1:5000/api";

type Profile = {
  name?: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  credits?: number;
};

export default function AccountDetails({ user }: any) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch logged-in user's profile
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${API}/profile/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setEditedProfile(data);
      });
  }, [user]);

  if (!profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  const handleChange = (field: keyof Profile, value: string) => {
    if (!editedProfile) return;
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSave = async () => {
    await fetch(`${API}/update-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProfile),
    });

    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <h1 className="text-3xl font-serif text-amber-900">
        Your Library Card
      </h1>

      <Card className="p-6 border-2 border-amber-200 bg-amber-50">
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-full bg-amber-700 flex items-center justify-center">
            <User className="text-white" size={48} />
          </div>

          <div className="flex-1 space-y-3">
            {isEditing ? (
              <>
                <Field label="Name">
                  <Input
                    value={editedProfile?.name || ""}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                  />
                </Field>

                <Field label="Phone">
                  <Input
                    value={editedProfile?.phone || ""}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                  />
                </Field>

                <Field label="Location">
                  <Input
                    value={editedProfile?.location || ""}
                    onChange={(e) =>
                      handleChange("location", e.target.value)
                    }
                  />
                </Field>

                <Field label="Bio">
                  <Input
                    value={editedProfile?.bio || ""}
                    onChange={(e) =>
                      handleChange("bio", e.target.value)
                    }
                  />
                </Field>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-amber-900">
                  {profile.name}
                </h2>

                <InfoRow icon={Mail} text={profile.email} />
                <InfoRow icon={Phone} text={profile.phone} />
                <InfoRow icon={MapPin} text={profile.location} />

                <p className="italic text-amber-700">
                  {profile.bio}
                </p>

                <p className="text-sm text-amber-600">
                  Credits: {profile.credits}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-4">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-amber-700 text-white"
            >
              <Edit2 size={16} className="mr-2" />
              Edit
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-green-600 text-white"
            >
              <Save size={16} className="mr-2" />
              Save
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/* Helper Components */

function InfoRow({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-amber-700">
      <Icon size={16} />
      <span>{text || "Not provided"}</span>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div>
      <Label className="text-amber-900">{label}</Label>
      {children}
    </div>
  );
}
