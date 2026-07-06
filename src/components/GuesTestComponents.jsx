import { NavLink, useNavigate } from "react-router-dom";
import { BsFillAirplaneFill } from "react-icons/bs";
import { FaHotel, FaMapMarkedAlt, FaMoneyBillAlt, FaBus, FaCarSide } from "react-icons/fa";
import { GiSailboat, GiCityCar } from "react-icons/gi";
import { SiMini } from "react-icons/si";
import { AiFillLock, AiFillCustomerService, AiOutlinePhone } from "react-icons/ai";
import Avatar from "./Avatar";
import FormBook from "./FormBook";
import ContactPopup from "./ContactPopup";

export const fleets = [
  {
    id: 1,
    name: "Bus Pariwisata",
    type: "40–60 Kursi",
    price: "Rp 4.500.000",
    duration: "Per Hari",
    tag: "Terlaris",
    tagColor: "bg-[#00BFA6]",
    emoji: <FaBus />,
    gradient: "from-[#0077B6] to-[#00BFA6]",
    desc: "Ideal untuk rombongan besar. Dilengkapi AC, reclining seat, dan bagasi luas.",
  },
  {
    id: 2,
    name: "Minibus",
    type: "12–20 Kursi",
    price: "Rp 1.800.000",
    duration: "Per Hari",
    tag: "Favorit",
    tagColor: "bg-[#FF6B4A]",
    emoji: <SiMini />,
    gradient: "from-[#F4A261] to-[#E76F51]",
    desc: "Cocok untuk grup kecil hingga menengah dengan kenyamanan maksimal.",
  },
  {
    id: 3,
    name: "Hiace / Travel",
    type: "8–12 Kursi",
    price: "Rp 1.200.000",
    duration: "Per Hari",
    tag: "Promo",
    tagColor: "bg-[#6C63FF]",
    emoji: <FaCarSide />,
    gradient: "from-[#2D6A4F] to-[#52B788]",
    desc: "Solusi perjalanan nyaman dan fleksibel untuk keluarga atau tim kecil.",
  },
  {
    id: 4,
    name: "Innova / SUV",
    type: "7–8 Kursi",
    price: "Rp 800.000",
    duration: "Per Hari",
    tag: "Baru",
    tagColor: "bg-[#FF6B4A]",
    emoji: <GiCityCar />,
    gradient: "from-[#023E8A] to-[#48CAE4]",
    desc: "Kendaraan premium untuk perjalanan keluarga dengan suspensi nyaman di segala medan.",
  },
];

export const services = [
  { icon: <BsFillAirplaneFill />, title: "Tiket Pesawat", desc: "Harga terbaik ke 200+ destinasi domestik dan internasional dengan berbagai maskapai pilihan." },
  { icon: <FaHotel />, title: "Hotel & Resort", desc: "Dari penginapan budget hingga resort bintang lima, kami kurasikan untuk pengalaman terbaik Anda." },
  { icon: <FaMapMarkedAlt />, title: "Paket Wisata", desc: "Itinerary siap pakai dengan pemandu berpengalaman — tinggal nikmati perjalanannya." },
  { icon: <GiSailboat />, title: "Transfer & Transport", desc: "Jemputan bandara, sewa kendaraan, hingga kapal privat tersedia 24 jam." },
];

export const testimonials = [
  { name: "Rina S.", city: "Jakarta", rating: 3, text: "Trip ke Raja Ampat bersama TravellingGO luar biasa! Semua terorganisir dengan sempurna, pemandunya ramah dan profesional.", avatar: "RS" },
  { name: "Budi P.", city: "Surabaya", rating: 1, text: "Harga paket sangat terjangkau untuk kualitas yang diberikan. Sudah 3x pesan dan selalu puas!", avatar: "BP" },
  { name: "Maya L.", city: "Bandung", rating: 2, text: "Layanan 24 jam membantu banget saat ada perubahan jadwal mendadak. Tim TravellingGO cepat tanggap dan solutif.", avatar: "ML" },
];

export const stats = [
  { value: "50K+", label: "Pelancong Puas" },
  { value: "200+", label: "Destinasi" },
  { value: "12+", label: "Tahun Pengalaman" },
  { value: "4.9★", label: "Rating Rata-rata" },
];

export const menus = [
  { title: "Destinasi", target: "destinasi" },
  { title: "Paket", target: "paket" },
  { title: "Tentang", target: "tentang" },
  { title: "Blog", target: "blog" },
];


export function Navbar({ scrolled, isLoggedIn, userInitials, showBooking, setShowBooking, menuOpen, setMenuOpen }) {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          bg-[#0B1E3D]/90 backdrop-blur-sm border-b border-white/10
          ${scrolled ? "shadow-lg" : "shadow-none"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#00BFA6] flex items-center justify-center text-white font-black text-lg">T</div>
            <span className="text-white font-black text-xl tracking-tight">
              Travelling<span className="text-[#00BFA6]">GO</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {menus.map((item) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                className="text-white/80 hover:text-[#00BFA6] text-sm font-medium transition-colors"
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn && (
              <>
                <button className="bg-[#FF6B4A] hover:bg-[#e85c3c] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#FF6B4A]/30 active:scale-95">
                  <NavLink to="/">Masuk</NavLink>
                </button>
                <button className="bg-[#FF6B4A] hover:bg-[#e85c3c] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#FF6B4A]/30 active:scale-95">
                  <NavLink to="/register">Daftar Gratis</NavLink>
                </button>
              </>
            )}
            {isLoggedIn && (
              <NavLink to="/profil" className="w-11 h-11 rounded-2xl bg-[#3F9CBF] flex items-center justify-center text-sm hover:shadow-lg hover:shadow-[#FF6B4A] transition-shadow">
                <Avatar initials={userInitials} />
              </NavLink>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0B1E3D] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {["Destinasi", "Paket", "Tentang", "Blog"].map((item) => (
              <a key={item} href="#" className="text-white/80 text-sm font-medium">{item}</a>
            ))}
            <button className="bg-[#FF6B4A] text-white text-sm font-bold py-2.5 rounded-xl mt-2">
              Daftar Gratis
            </button>
          </div>
        )}
      </nav>

      <FormBook isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
}

export function HeroSection({ searchQuery, setSearchQuery }) {
  return (
    <section id="destinasi" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E3D] via-[#0D3060] to-[#004E89]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00BFA6]/10 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/6 w-64 h-64 rounded-full bg-[#FF6B4A]/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80 C360 120 1080 40 1440 80 L1440 120 L0 120 Z" fill="#FAFAF8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Agen Perjalanan Terpercaya</span>
          </div>

          <h1 className="text-white font-black leading-none mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}>
            Dunia Ada<br />
            <span className="text-[#00BFA6]">di Depan</span> Mata.
          </h1>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 flex gap-2 shadow-2xl max-w-2xl">
            <div className="flex-1 flex items-center gap-3 px-4">
              <span className="text-[#00BFA6] text-xl">🔍</span>
              <input
                type="text"
                placeholder="Cari destinasi, paket, atau aktivitas..."
                className="flex-1 bg-transparent text-[#0B1E3D] text-sm placeholder-gray-400 outline-none py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-[#FF6B4A] hover:bg-[#e85c3c] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-lg active:scale-95 whitespace-nowrap">
              Cari Sekarang
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-white/50 text-xs">Populer:</span>
            {["Bus", "Minibus", "Hiace", "Innova"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-white/70 hover:text-white text-xs border border-white/20 hover:border-white/50 rounded-full px-3 py-1 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section id="stat" className="bg-[#0B1E3D] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[#00BFA6] font-black text-4xl leading-none mb-1">{s.value}</p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const gradientMap = {
  "Bus": "from-[#0077B6] to-[#00BFA6]",
  "Minibus": "from-[#F4A261] to-[#E76F51]",
  "Hiace": "from-[#2D6A4F] to-[#52B788]",
  "Innova": "from-[#023E8A] to-[#48CAE4]",
  "SUV": "from-[#023E8A] to-[#48CAE4]",
  "Travel": "from-[#2D6A4F] to-[#52B788]",
};

const tagColorMap = {
  "Bus": "bg-[#00BFA6]",
  "Minibus": "bg-[#FF6B4A]",
  "Hiace": "bg-[#6C63FF]",
  "Innova": "bg-[#FF6B4A]",
  "SUV": "bg-[#FF6B4A]",
  "Travel": "bg-[#6C63FF]",
};

const emojiMap = {
  "Bus": "🚌",
  "Minibus": "🚐",
  "Hiace": "🚗",
  "Innova": "🚙",
  "SUV": "🚙",
  "Travel": "🚗",
};

export function FleetCard({ product, onBook }) {
  const category = product?.category || "Bus";
  const gradient = gradientMap[category] || "from-[#0077B6] to-[#00BFA6]";
  const tagColor = tagColorMap[category] || "bg-[#00BFA6]";
  const emoji = emojiMap[category] || "🚌";
  const seatLabel = product?.seat ? `${product.seat} Kursi` : "-";
  const priceLabel = product?.price ? `Rp ${Number(product.price).toLocaleString("id-ID")}` : "-";

  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ minHeight: 380 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} group-hover:scale-105 transition-transform duration-500`} />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-6 right-6 text-7xl">{emoji}</div>
      </div>

      <div className="relative h-full flex flex-col justify-between p-6 min-h-[380px]">
        <span className={`self-start ${tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {category}
        </span>

        <div>
          <p className="text-white/70 text-sm mb-1">{seatLabel}</p>
          <h3 className="text-white font-black text-2xl leading-tight mb-2">{product?.name || "-"}</h3>
          <p className="text-white/60 text-sm mb-4 leading-relaxed">{product?.description || "-"}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs mb-0.5">Mulai dari</p>
              <p className="text-white font-black text-lg">{priceLabel}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs mb-0.5">Stok</p>
              <p className="text-white font-semibold text-sm">{product?.stock ?? "-"}</p>
            </div>
          </div>
          <button
            onClick={() => onBook && onBook(product)}
            className="mt-4 w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-sm py-3 rounded-xl transition-all border border-white/30 group-hover:bg-white group-hover:text-[#0B1E3D]"
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServiceCard({ service }) {
  return (
    <div className="group p-8 rounded-3xl border-2 border-gray-100 hover:border-[#00BFA6] hover:shadow-xl hover:shadow-[#00BFA6]/10 transition-all cursor-pointer">
      <div className="w-14 h-14 bg-[#F5E6C8] group-hover:bg-[#00BFA6]/10 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-colors">
        {service.icon}
      </div>
      <h3 className="text-[#0B1E3D] font-black text-lg mb-3">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
    </div>
  );
}

export function WhyUsCard({ item }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
      <span className="text-3xl mb-3 block">{item.icon}</span>
      <h4 className="text-white font-bold mb-1">{item.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
    </div>
  );
}

export function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-[#FF6B4A] text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00BFA6] to-[#0B1E3D] flex items-center justify-center text-white font-bold text-xs">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-[#0B1E3D] font-bold text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.city}</p>
        </div>
      </div>
    </div>
  );
}

export function CTABanner() {
  const navigate = useNavigate();

  const scrollToPaket = () => {
    const el = document.getElementById("paket");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-6 pb-24 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF6B4A] to-[#FF8F6B] p-12 md:p-16 text-center">
        <div className="absolute top-0 right-0 text-[180px] opacity-10 leading-none select-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Perjalanan Impianmu<br />Dimulai Hari Ini
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Daftar sekarang dan dapatkan <strong>diskon 20%</strong> untuk paket pertamamu. Promo terbatas untuk 100 pendaftar pertama!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-white text-[#FF6B4A] font-black px-8 py-4 rounded-2xl hover:shadow-xl transition-all active:scale-95 text-sm"
            >
              Daftar Sekarang — Gratis!
            </button>
            <button
              onClick={scrollToPaket}
              className="border-2 border-white/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-sm"
            >
              Lihat Semua Paket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="bg-[#0B1E3D] text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00BFA6] flex items-center justify-center text-white font-black text-lg">T</div>
              <span className="font-black text-xl">Travelling<span className="text-[#00BFA6]">GO</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Agen perjalanan digital terpercaya untuk semua petualanganmu, sejak 2012.
            </p>
            <div className="flex gap-4 flex items-center justify-center">
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Facebook</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">LinkedIn</a>
            </div>
          </div>
          {[
            { title: "Destinasi", links: ["Bali", "Raja Ampat", "Lombok", "Labuan Bajo", "Komodo"] },
            { title: "Layanan", links: ["Paket Wisata", "Hotel", "Tiket Pesawat", "Transfer", "Perlengkapan"] },
            { title: "Perusahaan", links: ["Tentang Kami", "Blog Travel", "Karier", "Press", "Hubungi Kami"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-4 text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-[#00BFA6] text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© 2024 TravellingGO. Semua hak dilindungi undang-undang.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Peta Situs</a>
          </div>
        </div>
      </div>
      <ContactPopup />
    </footer>
  );
}

export const whyUsItems = [
  { icon: <AiFillLock />, title: "Transaksi Aman", desc: "Pembayaran terlindungi dengan enkripsi bank-grade." },
  { icon: <AiOutlinePhone />, title: "Support 24/7", desc: "Tim siap membantu kapanpun kamu butuhkan, di mana pun." },
  { icon: <FaMoneyBillAlt />, title: "Harga Terbaik", desc: "Garansi harga kompetitif atau kami kembalikan selisihnya." },
  { icon: <AiFillCustomerService />, title: "Itinerary Custom", desc: "Perjalanan dirancang sesuai kepribadian dan budget-mu." },
];
