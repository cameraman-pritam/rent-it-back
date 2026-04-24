import React, { useState } from "react";
import {
  LocationOn,
  Edit,
  Star,
  Event,
  Favorite,
  AddCircle,
  PhotoCamera,
  Delete,
  Schedule,
} from "@mui/icons-material";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  // Main profile state
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    location: "Seattle, Washington",
    bio: "Adventure photographer and mountain enthusiast. Curating a library of professional-grade outdoor gear for the local community. Focused on sustainable exploration.",
  });

  // Temporary state for the edit form
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <main className="min-h-screen pb-32 bg-surface text-on-surface">
        {/* Hero Profile Section */}
        <section className="relative h-64 w-full bg-surface-container-lowest overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXd8UG9f8dxj-8XhZ7TlxG1SIZdus9cJYK_Xc4Ij3odNPCQrHBDrBIGEdpJ4XrVQ_CNMLs27uui_SAJKFqiqE0ute7-lF9_FRIwDjLWcr6ORZkoC4ncxiKkrJa2ljTiVexWVpq_nRP6KN-m0V5N7t358jNorOo4HmWCAKyoqrMJNqBoKt5KKzjCUafD874Evr1vOgGBGITSpWn4qmrcHCEfqt3WNFmxmpYnlOtNYC9eIc2kii9iCfrdvsX3jn-T7iEn0UDMmEhwzk')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
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

            {/* Right Main: Edit Forms & Gear */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Account Profile
                  </h2>
                  <div className="flex gap-4">
                    <button
                      onClick={handleCancel}
                      className="text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-br from-[#6dd9c3] to-[#46b5a1] text-on-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
                    >
                      Save Changes
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

              {/* Edit Mode Gear Library */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">
                    My Gear Library
                  </h2>
                  <button className="flex items-center text-primary font-bold text-sm hover:opacity-80 transition-opacity">
                    <AddCircle className="mr-1" /> Add New Gear
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group relative bg-surface-container rounded-[2rem] overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                    <div className="h-48 relative">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuATDtwDyYvRi9yUkizXAWV97DAEyuGhZPEUdOIypNckNNmm3WyYIsJFoVRhNu6J621DL3R6kf9qQ2QNZjhZ6mzyGoxSKvzgM4X8iO4V1bu4OVWunBfkdhhoE__8_uZJs-uTacZiEGh8JGi3_ye3_BIbGzAPjQs6KU41wBUcquGuMNOau56IlRO-JFkEhx6r32KIOa8goGAJkLIqjMHC1sAWo3zWtbI7sSc_Oe4vm2eX_mtavpd4XupGJl3KTinWV9ADhx5N3ER-hp0"
                        alt="Tent"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="bg-surface-container/80 backdrop-blur-md p-2 rounded-full text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                          <Edit className="text-sm" />
                        </button>
                        <button className="bg-surface-container/80 backdrop-blur-md p-2 rounded-full text-error hover:bg-error hover:text-on-error transition-all">
                          <Delete className="text-sm" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-primary px-3 py-1 rounded-full">
                        <span className="text-[10px] font-bold text-on-primary uppercase tracking-tighter">
                          Available
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-on-surface">
                        The North Face 2P Tent
                      </h3>
                      <div className="flex items-center mt-2 text-on-surface-variant text-sm">
                        <Schedule className="text-xs mr-1" />{" "}
                        <span>4 rentals completed</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-primary font-bold">
                          $25{" "}
                          <span className="text-on-surface-variant font-normal text-xs">
                            / day
                          </span>
                        </span>
                        <div className="flex items-center">
                          <Star className="text-primary text-sm mr-1" />{" "}
                          <span className="text-xs font-bold">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-on-surface selection:bg-primary/30 min-h-screen">
      {/* Profile Header */}
      <header className="relative w-full h-[400px] flex items-end px-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlzmfX96OqcmBgCcm3VkkVy50uhN0g8IQ4fxK5x4mMiww0GlgAgwpCcckEdpMAEug5wL1zy43V99Mrf9HWFRqdbUMofMH8VsEr2pl_oKr6DNRICs3LlAoPWiT45LKUgm-5NPeH3kCm1izUGq1R3AVRVUWz5Nhm2ZjfA39qNzTXHxyooJdXuHEpI5eHok-ziQJmVtrw3W_19hI-v5olyJvoJzL4y7tCSknb0FhUJp3o1EfiDZsq6PUlhvY5xMP3gU-EelN0UWzyxns"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 bg-surface-container/70 backdrop-blur-md rounded-xl overflow-hidden border border-outline-variant/15">
          <div className="flex flex-col items-center py-6 hover:bg-surface-container-high transition-colors">
            <span className="text-3xl font-black text-primary">12</span>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-1">
              Items Lent
            </span>
          </div>
          <div className="flex flex-col items-center py-6 hover:bg-surface-container-high transition-colors border-y md:border-y-0 md:border-x border-outline-variant/15">
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

      {/* Tabbed Navigation */}
      <section className="px-8 mt-16 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-12 border-b border-outline-variant/15 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 font-bold tracking-tight whitespace-nowrap transition-colors ${
                activeTab === "active"
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Active Rentals
            </button>
            <button
              onClick={() => setActiveTab("library")}
              className={`pb-4 font-bold tracking-tight whitespace-nowrap transition-colors ${
                activeTab === "library"
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              My Gear Library
            </button>
          </div>

          {/* Active Rentals Content */}
          {activeTab === "active" && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Current Journey Gear
                </h2>
                <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full uppercase tracking-wider">
                  2 Items Out
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex gap-6 p-6 bg-surface-container rounded-xl group hover:bg-surface-container-high transition-all duration-300">
                  <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2_Z-49AtMULVxlMTzQbcdi3nqizRhyPBwQxXf-IR2IJZ24RM2FvP9EoYetnMs9LJOq3lBp0czVOGWsYU1JqDDYslCAYE4l8T_A9i9ceZ1WwPkBnL-C0bMFA3IN-VB2ID5QWF-7sEILeCYsNupOZOr-MivBoisgUCwToI3znr_5Z4oRRf4eCNzIdFs__TRieKFnjZzIwR7u8iANjBi8D4N4oRgS-goOCi3EH6ktW-fsRovsd94EuRiOWyoGSdX4Sh8Hr74gzeXjIA"
                      alt="Lens"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                        Photography
                      </span>
                      <h3 className="text-xl font-bold text-on-surface mt-1">
                        Sony FE 24-70mm f/2.8 GM II
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-2">
                        Lent by{" "}
                        <span className="text-on-surface font-semibold">
                          Sarah M.
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-error mt-4">
                      <Event className="text-sm" />
                      <span className="text-sm font-bold">
                        Due in 3 days (Oct 24)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gear Library Content */}
          {activeTab === "library" && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  Available From {profile.name.split(" ")[0]}'s Studio
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-surface-container rounded-xl overflow-hidden relative group">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaQ7n_6zLt-bacBBIJehlGvEcreIRzdebd7-nAYd9xFrAq2-3dyUKODv7pMiUOfqpI27rsI1OT5ddv3jynzSAOxBw43jZknkfYTD97rPQCZUDw_yJMLtmXn57U--HiuEIB-2jF2lgAIlakHv4Ncob9YrWWRsv-E1IXdLZNgziO4dtS67CBpw723UJWyP9oPl6Wyll69qpFWAUUVyCeQq9gVv9OoKvqY-cTenCeNC_KgVSypQGEOaY-tpHD_J49MqHSmKZa7Oi126U"
                      alt="Gear"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-on-primary text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                        Available
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">
                      Peak Design 45L Travel
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-primary font-bold text-sm">
                        $15
                        <span className="text-on-surface-variant font-normal">
                          /day
                        </span>
                      </span>
                      <Favorite className="text-on-surface-variant text-base" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
