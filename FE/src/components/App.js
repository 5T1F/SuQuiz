import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Nav from "./Nav";
import Footer from "./Footer";
import { useAuthStore } from "../app/store";

import styles from "./App.module.css";
import "./App.font.css";

export default function App() {
  // const user = useAuthStore((state) => state.user);
  const user = "하하";

  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.bodyAndFooter}>
        <div>
          <body className={styles.body}>
            {/* 로그인 안하면 메인페이지에서 못 벗어남 */}
            {/* 로그인 모달 연결되게 바꿔보자~~~ */}
            {user == null ? <Navigate to={"/"} /> : <></>}
            <Outlet />
          </body>
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
}
