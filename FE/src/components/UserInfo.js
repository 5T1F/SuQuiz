import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function NavbarSide() {
  const dispatch = useDispatch();

  // 로그아웃
  // const onLogoutHandler = (e) => {
  //   dispatch(authAction.logout()).then((response) => {
  //     if (response.payload.message === "success") {
  //       alert("로그아웃이 완료되었습니다");
  //       window.location.replace("/");
  //       deleteUserInfo();
  //     } else {
  //       alert("로그아웃에 실패하였습니다. 다시 시도해주세요");
  //     }
  //   });
  // };

  const [state, setState] = useState({ right: false });
}
