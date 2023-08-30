import { HiOutlineHome, HiOutlineCog } from "react-icons/hi";
import { VscSymbolNamespace } from "react-icons/vsc"
import { NavLink } from "react-router-dom";


const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0
        flex flex-col
        bg-zinc-900 text-white drop-shadow"
    >
      <nav className="nav">
        <SideBarIconLink
          icon={<HiOutlineHome size="28" />}
          text="DashBoard"
         // key="DashBoard"
          to="/"
        />
                        <SideBarIconLink
          icon={<VscSymbolNamespace size="28" />}
          text="Send"
          //key="Settings"
          to="/send"
        />
        <SideBarIconLink
          icon={<HiOutlineCog size="28" />}
          text="Settings"
          //key="Settings"
          to="/settings"
        />

      </nav>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tootip" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const SideBarIconLink = ({ icon, text = "tootip", key, to }) => (
  <NavLink
    className={({ isActive }) => {
      return (
        (!isActive
          ? "sidebar-icon group"
          : "sidebar-icon-active group")
      );
    }}
    //key={key}
    to={to}
  >
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100 ">{text}</span>
  </NavLink>
);

export default SideBar;

// sidebar-icon-active group
