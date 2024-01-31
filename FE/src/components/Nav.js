import { NavLink } from "react-router-dom";
import Logo from "../assets/logoShort.png";
import UserInfo from "../feature/userInfo/UserInfo";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navItem}>
        <NavLink to="/">
          <img src={Logo} alt="logo" width={148} height={64.32} />
        </NavLink>
      </div>
      <div className={styles.navItem}>
        <NavLink to="/learning/bookmark">단어장</NavLink>
        <UserInfo />
      </div>
    </nav>
  );
}
