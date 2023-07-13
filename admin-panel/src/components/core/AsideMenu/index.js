import { Outlet, NavLink } from "react-router-dom";
import "./index.scss";

const auth = false;

let ss = () => {
  console.log(auth);
};

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
          <li>
            <button onClick={ss}></button>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};

export default AsideMenu;
