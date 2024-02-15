import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import Nav from "./Nav";

import styles from "./App.module.css";
import "./App.font.css";

export default function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.bodyAndFooter}>
        <div className={styles.body}>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
