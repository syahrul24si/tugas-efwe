import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AiFillCustomerService } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";

const navLinkClass = ({ isActive }) =>
  `flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "border-transparent text-white shadow-[0_10px_25px_rgba(239,35,60,0.32)] bg-[#ef233c]"
      : "border-black/10 bg-[#f0f0f0] text-[#ef233c] hover:border-white/20 hover:bg-white"
  }`;

export default function Sidebar({adminCount, executiveCount }) {
  const counts = {
    dashboard: null,
    admin: adminCount,
    executive: executiveCount,
  };

  return (
    <aside className="flex w-full max-w-[290px] flex-col border-r border-white/15 bg-[#101010] p-5 text-white lg:min-h-[calc(100vh-2px)]">
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

        <div className="space-y-2">
          <p className="px-1 text-[11px] font-medium text-white/60">Menu</p>
          <ul className="space-y-2">
            <li>
              <NavLink className={navLinkClass} to="/" end><MdDashboard className="h-4 w-4" />Dashboard</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="customer"><AiFillCustomerService className="h-4 w-4" />Customers</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="produk"><CiDeliveryTruck className="h-4 w-4" />Products</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="orders"><BsCalendarEvent className="h-4 w-4" />Orders</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/reports"><BsCalendarEvent className="h-4 w-4" />Reports</NavLink>
            </li>

            <p className="px-1 text-[11px] font-medium text-white/60">Testing</p>
            <li>
              <NavLink className={navLinkClass} to="/test"><BsCalendarEvent className="h-4 w-4" />Test</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/Login"><BsCalendarEvent className="h-4 w-4" />Test Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}