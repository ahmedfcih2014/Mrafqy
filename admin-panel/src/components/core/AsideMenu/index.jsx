import { Outlet, NavLink } from "react-router-dom";
import "./index.scss";

const AsideMenu = () => {
  return (
    <>
      <aside className="dashboard__aside">
        <ul className="aside__menu">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              dashbord
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              customers
            </NavLink>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};

export default AsideMenu;
