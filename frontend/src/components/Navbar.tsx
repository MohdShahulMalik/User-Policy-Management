import clsx from "clsx";
import styles from "../styles/navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className={clsx(
        "fixed top-14 left-[7.5%] flex w-[85%] justify-between rounded-4xl border-2 border-blue-200 bg-transparent p-6 text-[1.175rem] text-blue-950 shadow-2xl backdrop-blur-3xl",
        styles["main-nav"],
      )}
    >
      <div className={clsx("w-[30%] border-solid")}>
        <span className={clsx("font-bold")}>E&P Management</span>
      </div>

      <ul className={clsx("flex w-[30%] justify-between border-solid")}>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/employees">Employees</NavLink>
        </li>
        <li>
          <NavLink to="/policies">Policies</NavLink>
        </li>
      </ul>
    </nav>
  );
}
