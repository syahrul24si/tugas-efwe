import { useState, useEffect } from "react";
import { API } from "../../service/API";
import {
  Navbar,
  HeroSection,
  StatsSection,
  FleetCard,
  ServiceCard,
  WhyUsCard,
  TestimonialCard,
  CTABanner,
  FooterSection,
  services,
  testimonials,
  whyUsItems,
} from "../../components/GuesTestComponents";
import FormBook from "../../components/FormBook";

export default function TravellingGO() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [userInitials, setUserInitials] = useState("?");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);

    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserInitials(getInitials(parsed.full_name));
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await API.fetchProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleBook = (product) => {
    setSelectedProduct(product);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans text-[#0B1E3D] overflow-x-hidden">
      <Navbar
        scrolled={scrolled}
        isLoggedIn={isLoggedIn}
        userInitials={userInitials}
        showBooking={showBooking}
        setShowBooking={setShowBooking}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <StatsSection />

      <section id="paket" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#00BFA6] font-bold text-sm uppercase tracking-widest mb-2">Armada Kami</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-[#0B1E3D]">
              Pilihan<br />Armada Tersedia
            </h2>
          </div>
          <a href="#" className="text-[#FF6B4A] font-bold text-sm border-b-2 border-[#FF6B4A] pb-0.5 hover:border-[#0B1E3D] hover:text-[#0B1E3D] transition-colors self-start md:self-auto">
            Lihat Semua Armada →
          </a>
        </div>

        {loadingProducts ? (
          <p className="text-gray-400 text-center py-12">Memuat armada...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <FleetCard key={p.id} product={p} onBook={handleBook} />
            ))}
          </div>
        )}
      </section>

      <section id="tentang" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#00BFA6] font-bold text-sm uppercase tracking-widest mb-2">Layanan Kami</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1E3D]">Semua yang Kamu Butuhkan</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </section>

      <section className="bg-[#0B1E3D] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-[#00BFA6] font-bold text-sm uppercase tracking-widest mb-3">Kenapa TravellingGO?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Kami Tahu<br />Cara Membuat<br />
              <span className="text-[#00BFA6]">Kamu Bahagia</span>
            </h2>
            <button className="bg-[#FF6B4A] hover:bg-[#e85c3c] text-white font-black px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-[#FF6B4A]/30 active:scale-95">
              Konsultasi Gratis Sekarang
            </button>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUsItems.map((item) => (
              <WhyUsCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#00BFA6] font-bold text-sm uppercase tracking-widest mb-2">Cerita Pelancong</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1E3D]">Mereka Sudah Buktikan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      {!isLoggedIn && <CTABanner />}
      <FooterSection />

      <FormBook
        isOpen={showBooking}
        onClose={() => { setShowBooking(false); setSelectedProduct(null); }}
        product={selectedProduct}
      />
    </div>
  );
}
