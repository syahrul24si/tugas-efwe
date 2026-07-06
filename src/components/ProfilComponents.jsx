import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { GiIsland } from "react-icons/gi";
import { API } from "../service/API";

// ── DATA ──────────────────────────────────────────────────────────────────────
export const bookingData = [
  { month: "Jan", trips: 0 }, { month: "Feb", trips: 1 },
  { month: "Mar", trips: 2 }, { month: "Apr", trips: 1 },
  { month: "Mei", trips: 3 }, { month: "Jun", trips: 2 },
  { month: "Jul", trips: 4 }, { month: "Agu", trips: 3 },
  { month: "Sep", trips: 5 }, { month: "Okt", trips: 2 },
  { month: "Nov", trips: 3 }, { month: "Des", trips: 4 },
];

export const activePackages = [
  {
    id: 1,
    name: "Paket Raja Ampat Premium",
    type: "Paket Wisata",
    access: "All-Inclusive",
    startDate: "15/03/2025",
    expireDate: "19/03/2025",
    cost: "Rp 4.200.000",
    status: "Upcoming",
    statusColor: "bg-[#00BFA6]/15 text-[#00BFA6]",
  },
  {
    id: 2,
    name: "Paket Bali Family 4D3N",
    type: "Paket Keluarga",
    access: "Breakfast Included",
    startDate: "01/02/2025",
    expireDate: "04/02/2025",
    cost: "Rp 2.800.000",
    status: "Selesai",
    statusColor: "bg-gray-100 text-gray-500",
  },
];

export const rewardHistory = [
  { desc: "Trip Raja Ampat Selesai", pts: "+420", date: "Mar 2025", plus: true },
  { desc: "Referral member baru", pts: "+200", date: "Feb 2025", plus: true },
  { desc: "Penukaran diskon 10%", pts: "-500", date: "Jan 2025", plus: false },
  { desc: "Trip Bali Selesai", pts: "+280", date: "Feb 2025", plus: true },
  { desc: "Bonus ulang tahun", pts: "+100", date: "Agu 2024", plus: true },
];

export const tripHistoryData = [
  { dest: "Raja Ampat", dates: "15–19 Mar 2025", type: "Paket Premium", price: "Rp 4.200.000", pts: "+420 pts", status: "Upcoming", sc: "text-[#00BFA6] bg-[#00BFA6]/10" },
  { dest: "Bali", dates: "01–04 Feb 2025", type: "Paket Keluarga", price: "Rp 2.800.000", pts: "+280 pts", status: "Selesai", sc: "text-gray-400 bg-gray-100" },
  { dest: "Lombok", dates: "10–13 Agu 2024", type: "Paket Standard", price: "Rp 2.200.000", pts: "+220 pts", status: "Selesai", sc: "text-gray-400 bg-gray-100" },
  { dest: "Labuan Bajo", dates: "20–25 Jun 2024", type: "Paket Adventure", price: "Rp 3.500.000", pts: "+350 pts", status: "Selesai", sc: "text-gray-400 bg-gray-100" },
  { dest: "Bromo", dates: "22–24 Jan 2024", type: "Paket Sunrise", price: "Rp 1.800.000", pts: "+180 pts", status: "Selesai", sc: "text-gray-400 bg-gray-100" },
];

export const navItems = [
  { id: "profile", icon: "👤", label: "Profil" },
];

export const memberBadge = {
  Gold:   { bg: "from-yellow-400 to-amber-500",   text: "text-amber-900", border: "border-yellow-400", icon: "👑" },
  Silver: { bg: "from-slate-300 to-slate-400",     text: "text-slate-800", border: "border-slate-400", icon: "🥈" },
  Bronze: { bg: "from-orange-300 to-orange-500",   text: "text-orange-900", border: "border-orange-400", icon: "" },
};

// ── HELPER ────────────────────────────────────────────────────────────────────
export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

export function IconSidebar({ activeNav, setActiveNav, onLogout }) {
  return (
    <aside className="w-[72px] bg-[#0B1E3D] flex flex-col items-center py-5 gap-6 fixed left-0 top-0 bottom-0 z-30">
      <div className="w-10 h-10 rounded-xl bg-[#00BFA6] flex items-center justify-center text-white font-black text-lg flex-shrink-0">
        T
      </div>

      <nav className="flex flex-col gap-1 flex-1 w-full items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            title={item.label}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-lg
              ${activeNav === item.id
                ? "bg-[#00BFA6] text-white shadow-lg shadow-[#00BFA6]/30"
                : "text-white/40 hover:bg-white/10 hover:text-white"
              }`}
          >
            <span>{item.icon}</span>
            <span className="text-[8px] font-semibold leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        title="Keluar"
        className="w-9 h-9 rounded-full bg-red-500/20 hover:bg-red-500 flex items-center justify-center text-red-400 hover:text-white transition-all text-sm border-2 border-red-500/30 hover:border-red-500"
      >
        ⏻
      </button>
    </aside>
  );
}

export function ProfileSidebar({ profile }) {
  const memberStatus = profile?.tier || "Bronze";
  const badge = memberBadge[memberStatus] || memberBadge.Bronze;
  const totalPoints = profile?.points ?? 0;
  const fullName = profile?.full_name || "Pengguna";
  const email = profile?.email || "-";
  const initials = getInitials(fullName);
  const memberSince = formatDate(profile?.created_at);
  const memberId = profile?.id ? profile.id.slice(0, 8).toUpperCase() : "TG-0000";

  return (
    <aside className="w-72 bg-white shadow-sm fixed left-[72px] top-0 bottom-0 overflow-y-auto z-20 flex flex-col">
      <div className="px-6 pt-5 pb-3">
        <button className="flex items-center gap-2 text-gray-400 hover:text-[#0B1E3D] text-sm transition-colors">
          <NavLink to="/Guest">← Kembali</NavLink>
        </button>
      </div>

      <div className="flex flex-col items-center px-6 pb-6 pt-2">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00BFA6] to-[#0B1E3D] flex items-center justify-center text-white font-black text-3xl shadow-xl">
            {initials}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${badge.bg} flex items-center justify-center text-sm shadow-md border-2 border-white`}>
            {badge.icon}
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${badge.bg} ${badge.text} text-xs font-black px-3 py-1 rounded-full mb-3 shadow border ${badge.border}`}>
          {badge.icon} {memberStatus} Member
        </span>

        <h2 className="text-xl font-black text-[#0B1E3D] text-center">{fullName}</h2>
        <p className="text-gray-400 text-sm mt-0.5">Member sejak {memberSince}</p>

        <div className="mt-5 w-full grid grid-cols-2 gap-3">
          <div className="bg-[#EEF2F7] rounded-2xl p-3 text-center">
            <p className="text-[#0B1E3D] font-black text-xl leading-none">{memberId}</p>
            <p className="text-gray-400 text-xs mt-1">Member ID</p>
          </div>
          <div className="bg-[#EEF2F7] rounded-2xl p-3 text-center">
            <p className="text-[#00BFA6] font-black text-xl leading-none">{totalPoints.toLocaleString()}</p>
            <p className="text-gray-400 text-xs mt-1">Poin Reward</p>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t border-gray-100 mb-4" />

      <div className="px-6 pb-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Informasi Pribadi</p>
        <div className="flex flex-col gap-3">
          {[
            { label: "Tanggal Lahir", value: "23/08/1992" },
            { label: "No. Telepon", value: "+62 812-3456-7890" },
            { label: "Email", value: email },
            { label: "Kota Asal", value: "Pekanbaru, Riau" },
            { label: "Kewarganegaraan", value: "Indonesia 🇮🇩" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-start gap-2">
              <span className="text-gray-400 text-xs flex-shrink-0">{row.label}</span>
              <span className="text-[#0B1E3D] text-xs font-semibold text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-6 border-t border-gray-100 my-4" />

      <div className="px-6 pb-6">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Detail Pembayaran</p>
        <div className="flex items-center justify-between bg-[#EEF2F7] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
              <span className="text-white text-[8px] font-black">VISA</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1E3D]">**** 5821</p>
              <p className="text-[10px] text-gray-400">Default</p>
            </div>
          </div>
          <button className="text-gray-300 hover:text-gray-500 text-lg">⋮</button>
        </div>
      </div>
    </aside>
  );
}

export function TabBar({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-6 border-b border-gray-200 mb-8">
      {tabs.map((tab) => {
        const tabKey = tab.toLowerCase().replace(" ", "-");
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tabKey)}
            className={`pb-3 text-sm font-bold transition-all relative
              ${activeTab === tabKey
                ? "text-[#00BFA6]"
                : "text-gray-400 hover:text-[#0B1E3D]"
              }`}
          >
            {tab}
            {activeTab === tabKey && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00BFA6] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function StatCardItem({ stat }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <span className="text-2xl">{stat.icon}</span>
      <p className={`text-2xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
      <p className="text-[#0B1E3D] text-sm font-semibold leading-tight">{stat.label}</p>
      <p className="text-gray-400 text-xs mt-0.5">{stat.sub}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B1E3D] text-white text-xs rounded-xl px-3 py-2 shadow-xl">
        <p className="font-bold mb-0.5">{label}</p>
        <p className="text-[#00BFA6]">{payload[0].value} trip</p>
      </div>
    );
  }
  return null;
};

export function BookingChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black text-[#0B1E3D]">Aktivitas Booking</h3>
          <p className="text-gray-400 text-sm">Jumlah trip per bulan — 2025</p>
        </div>
        <div className="flex gap-1">
          {["3B", "6B", "1T"].map((t, i) => (
            <button key={t} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${i === 2 ? "bg-[#0B1E3D] text-white" : "text-gray-400 hover:text-[#0B1E3D]"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={bookingData} barSize={18} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,191,166,0.06)", radius: 6 }} />
          <Bar dataKey="trips" radius={[6, 6, 0, 0]}>
            {bookingData.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.trips >= 4 ? "#00BFA6" : entry.trips >= 2 ? "#0077B6" : "#BFE8E3"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TripBanner() {
  return (
    <div className="relative bg-gradient-to-r from-[#0B1E3D] to-[#004E89] rounded-3xl p-6 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 text-[120px] flex items-center pr-4 opacity-60 select-none"><GiIsland /></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <span className="bg-[#FF6B4A] text-white text-xs font-black px-2.5 py-1 rounded-full mb-3 inline-block">Segera Berangkat</span>
          <h3 className="text-white font-black text-xl mb-1">Raja Ampat Premium Package</h3>
          <p className="text-white/60 text-sm">Keberangkatan: 15 Maret 2025 · 5 Hari 4 Malam · All-Inclusive</p>
        </div>
        <button className="bg-[#00BFA6] hover:bg-[#009f8a] text-white font-black px-5 py-3 rounded-2xl text-sm transition-all whitespace-nowrap flex-shrink-0 ml-6">
          Lihat Detail →
        </button>
      </div>
    </div>
  );
}

export function PackageList() {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
        <h3 className="text-[#0B1E3D] font-black text-base">Paket Aktif & Riwayat</h3>
        <button className="bg-[#00BFA6] hover:bg-[#009f8a] text-white text-xs font-black px-4 py-2 rounded-xl transition-all">
          + Booking Baru
        </button>
      </div>
      <div className="divide-y divide-gray-50">
        {activePackages.map((pkg) => (
          <div key={pkg.id} className="px-6 py-5 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[#0B1E3D] font-black text-sm">{pkg.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pkg.statusColor}`}>{pkg.status}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{pkg.type} · Akses: {pkg.access}</p>
                  <div className="flex gap-6 text-xs text-gray-500">
                    <span>Mulai: <strong className="text-[#0B1E3D]">{pkg.startDate}</strong></span>
                    <span>Selesai: <strong className="text-[#0B1E3D]">{pkg.expireDate}</strong>
                      <button className="text-[#00BFA6] hover:underline ml-1">(Ubah)</button>
                    </span>
                    <span>Biaya: <strong className="text-[#0B1E3D]">{pkg.cost}</strong>
                      <button className="text-[#00BFA6] hover:underline ml-1">(Ubah)</button>
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-[#FF6B4A] hover:underline text-xs font-bold whitespace-nowrap flex-shrink-0">
                Batalkan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TripHistoryList() {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-black text-[#0B1E3D]">Semua Riwayat Perjalanan</h3>
        <select className="border border-gray-200 rounded-xl text-sm px-3 py-2 outline-none text-gray-500">
          <option>Semua Tahun</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <div className="divide-y divide-gray-50">
        {tripHistoryData.map((t) => (
          <div key={t.dest + t.dates} className="px-6 py-5 hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-black text-[#0B1E3D] text-sm">{t.dest}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.sc}`}>{t.status}</span>
              </div>
              <p className="text-xs text-gray-400">{t.dates} · {t.type}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-black text-[#0B1E3D] text-sm">{t.price}</p>
              <p className="text-[#00BFA6] text-xs font-bold">{t.pts}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RewardStatusCard({ memberStatus, totalPoints, badge }) {
  return (
    <div className={`bg-gradient-to-r ${badge.bg} rounded-3xl p-6 text-white relative overflow-hidden`}>
      <div className="absolute right-4 top-0 bottom-0 flex items-center text-[100px] opacity-20 select-none">{badge.icon}</div>
      <div className="relative z-10">
        <p className={`text-sm font-black mb-1 ${badge.text} opacity-70`}>Status Membership</p>
        <h2 className={`text-3xl font-black ${badge.text} mb-3`}>{memberStatus} Member</h2>
        <p className={`text-5xl font-black ${badge.text}`}>{totalPoints.toLocaleString()} <span className="text-2xl">poin</span></p>
        <p className={`text-sm mt-2 ${badge.text} opacity-60`}>Butuh 660 poin lagi untuk naik level</p>
        <div className="mt-3 w-full bg-black/10 rounded-full h-2">
          <div className="bg-white/80 h-2 rounded-full" style={{ width: "78%" }} />
        </div>
      </div>
    </div>
  );
}

export function RewardHistoryList() {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50">
        <h3 className="font-black text-[#0B1E3D]">Riwayat Poin</h3>
      </div>
      <div className="divide-y divide-gray-50">
        {rewardHistory.map((r, i) => (
          <div key={i} className="px-6 py-4 hover:bg-gray-50/50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${r.plus ? "bg-[#00BFA6]/10" : "bg-[#FF6B4A]/10"}`}>
                {r.plus ? "⬆️" : "⬇️"}
              </div>
              <div>
                <p className="text-[#0B1E3D] text-sm font-semibold">{r.desc}</p>
                <p className="text-gray-400 text-xs">{r.date}</p>
              </div>
            </div>
            <p className={`font-black text-base ${r.plus ? "text-[#00BFA6]" : "text-[#FF6B4A]"}`}>{r.pts}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-50">
        <button className="w-full text-center text-[#00BFA6] text-sm font-bold hover:underline">
          Tukarkan Poin dengan Diskon →
        </button>
      </div>
    </div>
  );
}
