import React, { useState, useEffect } from "react";
import { LocationOn, Edit, Star, PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useDb } from "../../context/dbContext";
import Swal from "sweetalert2";

export default function Profile() {
  const { user } = useAuth();
  const { readRecord, updateRecord, isLoading } = useDb();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Loading...",
    location: "Loading...",
    mobile: "Loading...",
    bio: "Adventure photographer and mountain enthusiast. Curating a library of professional-grade outdoor gear for the local community. Focused on sustainable exploration.",
  });

  const [editForm, setEditForm] = useState({ ...profile });

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.id) return;

      try {
        const data = await readRecord("users", { uid: user.id });

        // Supabase sometimes returns an array, sometimes an object
        const dbUser = Array.isArray(data) ? data[0] : data;

        if (dbUser) {
          const fetchedData = {
            name: dbUser.name || "No name set",
            location: dbUser.address || "No location set",
            mobile: dbUser.mobile || "No mobile set",
            bio: profile.bio,
          };
          setProfile(fetchedData);
          setEditForm(fetchedData);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, readRecord]);

  // Handle saving changes to the database
  const handleSave = async () => {
    try {
      await updateRecord(
        "users",
        {
          name: editForm.name,
          address: editForm.location,
          mobile: editForm.mobile,
        },
        { uid: user.id }
      );

      setProfile(editForm);
      setIsEditing(false);
      Swal.fire({
        title: "Locked In!",
        text: "Profile updated successfully.",
        icon: "success",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        "L",
        "Failed to update profile. Check the console, bro.",
        "error"
      );
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  // ----------------------------------------------------
  // EDIT MODE UI
  // ----------------------------------------------------
  if (isEditing) {
    return (
      <main className="min-h-screen pb-32 bg-surface text-on-surface font-body">
        {/* Hero Profile Section */}
        <section className="relative h-64 w-full bg-surface-container overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXd8UG9f8dxj-8XhZ7TlxG1SIZdus9cJYK_Xc4Ij3odNPCQrHBDrBIGEdpJ4XrVQ_CNMLs27uui_SAJKFqiqE0ute7-lF9_FRIwDjLWcr6ORZkoC4ncxiKkrJa2ljTiVexWVpq_nRP6KN-m0V5N7t358jNorOo4HmWCAKyoqrMJNqBoKt5KKzjCUafD874Evr1vOgGBGITSpWn4qmrcHCEfqt3WNFmxmpYnlOtNYC9eIc2kii9iCfrdvsX3jn-T7iEn0UDMmEhwzk')",
            }}
          ></div>
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent"></div>
        </section>

        {/* Profile Content Canvas */}
        <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Sidebar: Identity */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex flex-col items-center lg:items-start space-y-6">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border-4 border-surface overflow-hidden shadow-2xl">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP0zeCdKtsnGcYmlqC4FbvTfOcr2ihQawLy9rWyFSHWDtdEMbvpaSnaDpH2O_I0Unt9Y4dHzqR82NF6hiJehxo_4aDoXYY7Au-OqDCFfeSKCQVfR_dvC1NSDMFOCXAFELzOV5sNBeNdJVxlfBg5GDpMGPtmRf0mzMseqSVX3EbQAjh53VbFsRwFIKIE-jiMguDeeWLxhcK0WxrPUbAqwpOuA5gkgBAmgaSdcd_xEgIQEBZPPKciqi1RG2fmMZOLIHEA20pSfEiD6A"
                    />
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
                    <div className="bg-primary p-3 rounded-full text-on-primary shadow-lg">
                      <PhotoCamera />
                    </div>
                  </button>
                </div>
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">
                    {editForm.name}
                  </h1>
                  <p className="text-primary font-medium tracking-wide flex items-center justify-center lg:justify-start mt-1">
                    <LocationOn className="text-sm mr-1" />
                    {editForm.location}
                  </p>
                </div>

                {/* Stats Bento */}
                <div className="grid grid-cols-3 gap-3 w-full">
                  <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-on-surface">
                      12
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">
                      Lent
                    </span>
                  </div>
                  <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-on-surface">
                      5
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">
                      Borrowed
                    </span>
                  </div>
                  <div className="bg-surface-container-high border border-primary/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center text-primary">
                      <span className="text-2xl font-bold">4.9</span>
                      <Star className="text-sm ml-0.5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">
                      Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Main: Edit Forms */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Account Profile
                  </h2>
                  <div className="flex gap-4">
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="signature-gradient text-on-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all outline-none"
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">
                      Location
                    </label>
                    <input
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all outline-none"
                      type="text"
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">
                      Mobile Number
                    </label>
                    <input
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all outline-none"
                      type="text"
                      value={editForm.mobile}
                      onChange={(e) =>
                        setEditForm({ ...editForm, mobile: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all outline-none resize-none"
                      rows="3"
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm({ ...editForm, bio: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ----------------------------------------------------
  // VIEW MODE UI
  // ----------------------------------------------------
  return (
    <main className="bg-surface text-on-surface selection:bg-primary/30 min-h-screen font-body">
      {/* Profile Header */}
      <header className="relative w-full h-100 flex items-end px-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlzmfX96OqcmBgCcm3VkkVy50uhN0g8IQ4fxK5x4mMiww0GlgAgwpCcckEdpMAEug5wL1zy43V99Mrf9HWFRqdbUMofMH8VsEr2pl_oKr6DNRICs3LlAoPWiT45LKUgm-5NPeH3kCm1izUGq1R3AVRVUWz5Nhm2ZjfA39qNzTXHxyooJdXuHEpI5eHok-ziQJmVtrw3W_19hI-v5olyJvoJzL4y7tCSknb0FhUJp3o1EfiDZsq6PUlhvY5xMP3gU-EelN0UWzyxns"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative group">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-surface shadow-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWrsMri0_OtpgCkABNylgYnrwuPeOjQIPiIzox-BYU6azY6-7_SrY9uW1AaR7enjbWfIxlZSXxRamQza8U_hBBWZRbLGUUuSK8CQu4Lmt2QlEc6V5qfeCcJhlMAF4RZOdQBZt2VURJf84TTPhbNtcUG2bILEvyXnYhbD21QhCuo-HLAiAEzNGcweFvZaYq4FFDiqre8ajOP4v3tZg7GE3dlfcikoH89c46zB3td23AD0YI1L40V4y2m13TtI1fjD5Wazuc6aNycWQ"
                alt="Avatar"
              />
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg active:scale-90 transition-transform"
            >
              <Edit className="text-sm" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface">
                {profile.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <LocationOn className="text-lg" />
                <span className="font-medium tracking-tight">
                  {profile.location}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-on-surface-variant font-medium leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="px-8 -mt-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 glass-panel ghost-border rounded-xl overflow-hidden">
          <div className="flex flex-col items-center py-6 hover:bg-surface-container-high transition-colors">
            <span className="text-3xl font-black text-primary">12</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-1">
              Items Lent
            </span>
          </div>
          <div className="flex flex-col items-center py-6 hover:bg-surface-container-high transition-colors border-y md:border-y-0 md:border-x border-outline/20">
            <span className="text-3xl font-black text-primary">5</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-1">
              Items Borrowed
            </span>
          </div>
          <div className="flex flex-col items-center py-6 hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-black text-primary">4.9</span>
              <Star className="text-primary" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-1">
              User Rating
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
