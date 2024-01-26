import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <div>
        <NavLink to="/">SuQuiz</NavLink>
      </div>
      <div>
        <NavLink to="/bookmark">단어장</NavLink>
      </div>
      <div>
        <NavLink to="/mypage">마이페이지</NavLink>
      </div>
    </nav>
  );
}
