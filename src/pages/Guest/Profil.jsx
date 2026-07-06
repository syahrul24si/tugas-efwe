import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/API";
import {
  IconSidebar,
  ProfileSidebar,
  TabBar,
  StatCardItem,
  BookingChart,
  TripBanner,
  PackageList,
  TripHistoryList,
  RewardStatusCard,
  RewardHistoryList,memberBadge,} from "../../components/ProfilComponents";

export default function TravellingGOProfile() {
  const [activeNav, setActiveNav] = useState("profile");
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      navigate("/guest");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setLoading(false);
          return;
        }
        const parsed = JSON.parse(userData);
        const { data, error } = await API.getProfileById(parsed.id);
        if (!error && data) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const memberStatus = profile?.tier || "Bronze";
  const badge = memberBadge[memberStatus] || memberBadge.Bronze;
  const totalPoints = profile?.points ?? 0;

  const tabs = ["Overview", "Riwayat Trip", "Poin Reward"];

  const overviewStats = [
    { label: "Total Trip", value: "12", sub: "Sepanjang masa", color: "text-[#00BFA6]" },
    { label: "Trip Tahun Ini", value: "4", sub: "2025", color: "text-[#FF6B4A]" },
    { label: "Poin Reward", value: totalPoints.toLocaleString(), sub: `Level ${memberStatus}`, color: "text-amber-500" },
    { label: "Total Belanja", value: "Rp 18,4Jt", sub: "Sepanjang masa", color: "text-purple-500" },
  ];

  return (
    <div className="flex min-h-screen bg-[#EEF2F7] font-sans text-[#0B1E3D]">
      <IconSidebar activeNav={activeNav} setActiveNav={setActiveNav} onLogout={handleLogout} />
      <ProfileSidebar profile={profile} />

      <main className="flex-1 ml-[344px] p-8 overflow-y-auto">
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-4">
              {overviewStats.map((s) => (
                <StatCardItem key={s.label} stat={s} />
              ))}
            </div>

            <BookingChart />
            <TripBanner />
            <PackageList />
          </div>
        )}

        {activeTab === "riwayat-trip" && <TripHistoryList />}
        
        {activeTab === "poin-reward" && (
          <div className="flex flex-col gap-6">
            <RewardStatusCard memberStatus={memberStatus} totalPoints={totalPoints} badge={badge} />
            <RewardHistoryList />
          </div>
        )}
      </main>
    </div>
  );
}
