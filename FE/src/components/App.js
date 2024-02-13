import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "./Nav";

import styles from "./App.module.css";
import "./App.font.css";

export default function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.bodyAndFooter}>
        <div>
          <div className={styles.body}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
