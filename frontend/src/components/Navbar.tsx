import clsx from "clsx";
import styles from "../styles/navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={clsx("flex justify-between w-[85%] fixed top-14 border-2 border-blue-200 rounded-4xl left-[7.5%] p-6 text-[1.175rem] text-blue-950 bg-transparent backdrop-blur-3xl shadow-2xl", styles["main-nav"])}>
      <div className={clsx("border-solid w-[30%] ")}>
        <span className={clsx("font-bold")}>E&P Management</span>
      </div>

      <ul className={clsx("flex justify-between  border-solid w-[30%]")}>
        <li><NavLink to = "/">Dashboard</NavLink></li>
        <li><NavLink to = "/employees">Employees</NavLink></li>        
        <li><NavLink to = "/policies">Policies</NavLink></li>
      </ul>
    </nav>
  );
}
