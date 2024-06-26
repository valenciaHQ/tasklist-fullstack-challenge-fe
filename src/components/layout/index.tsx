import { Outlet } from "react-router-dom";
import CustomAppbar from "../appBar";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <CustomAppbar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
