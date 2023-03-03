import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div>
      <nav>
        Hack-a-Team
      </nav>

      <hr />

      {/* Render active route, defined in Router */}
      <Outlet />
    </div>
  );
}
