import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiFillCustomerService } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";

const sections = [
  {
    title: "User Details",
    items: [
      { key: "admin", label: "Admin", count: 5 },
      { key: "executive", label: "Executive", count: 9 },
    ],
  },
];

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.4-8 5.4 0 .9.7 1.6 1.6 1.6h12.8c.9 0 1.6-.7 1.6-1.6 0-3-3.6-5.4-8-5.4Z" />
    </svg>
  );
}

const menuIcons = {
  dashboard: <GridIcon />,
  admin: <UserIcon />,
  executive: <UserIcon />,
};

const navLinkClass = ({ isActive }) =>
  `flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "border-transparent text-white shadow-[0_10px_25px_rgba(239,35,60,0.32)] bg-[#ef233c]"
      : "border-black/10 bg-[#f0f0f0] text-[#ef233c] hover:border-white/20 hover:bg-white"
  }`;

export default function Sidebar({ activeMenu, onSelect, adminCount, executiveCount, accent }) {
  const counts = {
    dashboard: null,
    admin: adminCount,
    executive: executiveCount,
  };

  return (
    <aside className="flex w-full max-w-[290px] flex-col border-r border-white/15 bg-[#101010] p-5 text-white lg:min-h-[calc(100vh-2px)]">
      {/* Logo */}
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white px-3 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ef233c] bg-white text-[#111]">
          <span className="text-lg font-black tracking-tight text-[#ef233c]">S</span>
        </div>
        <div className="min-w-0 text-[#8d0a0a]">
          <div className="text-[28px] font-black leading-none tracking-tight">TravelingGO</div>
          <div className="text-[9px] font-semibold tracking-[0.18em] text-[#666]">
            Admin Sales Information Dashboard
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/15 bg-[#3d4249] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">

        {/* Navigation Links */}
        <div className="space-y-2">
          <p className="px-1 text-[11px] font-medium text-white/60">Menu</p>
          <ul className="space-y-2">
            <li>
              <NavLink className={navLinkClass} to="/" end>
                <MdDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="customer">
                <AiFillCustomerService className="h-4 w-4" />
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="produk">
                <CiDeliveryTruck className="h-4 w-4" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="orders">
                <BsCalendarEvent className="h-4 w-4" />
                Orders
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Sections with badge counts */}
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-1 text-[11px] font-medium text-white/60">{section.title}</p>
            <div className="space-y-2">
              {section.items.map((item) => {
                const isActive = activeMenu === item.key;
                const badgeCount = counts[item.key];

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onSelect(item.key)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "border-transparent text-white shadow-[0_10px_25px_rgba(239,35,60,0.32)]"
                        : "border-black/10 bg-[#f0f0f0] text-[#ef233c] hover:border-white/20 hover:bg-white"
                    }`}
                    style={isActive ? { backgroundColor: accent } : undefined}
                  >
                    <span className="flex items-center gap-2">
                      <span>{menuIcons[item.key]}</span>
                      <span>{item.label}</span>
                    </span>
                    {badgeCount !== null ? (
                      <span className="inline-flex min-w-5 items-center justify-center rounded-sm bg-[#7ed957] px-1.5 text-[11px] font-bold leading-4 text-black">
                        {badgeCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      </div>
    </aside>
  );
}