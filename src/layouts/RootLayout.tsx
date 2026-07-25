import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div>
      <nav>nav</nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
