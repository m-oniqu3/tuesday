import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      <nav>auth layout</nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
