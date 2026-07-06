import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { AiFillCustomerService } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";
import { API } from "../service/API";

const navLinkClass = ({ isActive }) =>
  `flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "border-transparent text-white shadow-[0_10px_25px_rgba(239,35,60,0.32)] bg-[#ef233c]"
      : "border-black/10 bg-[#f0f0f0] text-[#ef233c] hover:border-white/20 hover:bg-white"
  }`;

export default function Sidebar({adminCount, memberCount }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <aside className="flex w-full max-w-[290px] flex-col border-r border-white/15 bg-[#101010] p-5 text-white">
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white px-3 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ef233c] bg-white text-[#111]">
          <span className="w-10 h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center text-white font-black text-lg shadow-md">T</span>
        </div>
        <div className="min-w-0 text-[#8d0a0a]">
          <div className="text-2xl font-black text-[#0B1E3D] tracking-tight">Travelling<span className="text-[#FF6B4A]">GO</span></div>
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
              <NavLink className={navLinkClass} to="/dashboard" end><MdDashboard className="h-4 w-4" />Dashboard</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="customer"><AiFillCustomerService className="h-4 w-4" />Users</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="produk"><CiDeliveryTruck className="h-4 w-4" />Products</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="orders"><BsCalendarEvent className="h-4 w-4" />Orders</NavLink>
            </li>
            {/* <li>
              <NavLink className={navLinkClass} to="/reports"><BsCalendarEvent className="h-4 w-4" />Reports</NavLink>
            </li> *

            * <p className="px-1 text-[11px] font-medium text-white/60">Testing</p>
            <li>
              <NavLink className={navLinkClass} to="/test"><BsCalendarEvent className="h-4 w-4" />Add User</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/profil"><BsCalendarEvent className="h-4 w-4" />Profil</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/guest"><BsCalendarEvent className="h-4 w-4" />Guest</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/Login"><BsCalendarEvent className="h-4 w-4" />Test Login</NavLink>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
        >
          <MdLogout className="h-4 w-4" />Logout
        </button>
      </div>
    </aside>
  );
}