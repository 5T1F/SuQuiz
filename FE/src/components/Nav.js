import { NavLink } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function Nav() {
  return (
    <nav>
      <div>
        <NavLink to="/">SuQuiz</NavLink>
      </div>
      <div>
        <NavLink to="/learning/bookmark">단어장</NavLink>
      </div>
      <UserInfo />
    </nav>
  );
}
