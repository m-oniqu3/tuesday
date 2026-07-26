import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="page">
      <nav>auth page nav goes here</nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
