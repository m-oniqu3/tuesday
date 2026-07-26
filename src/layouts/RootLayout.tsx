import { Outlet } from "react-router";
import AuthNav from "../components/nav/AuthNav";
import GuestNav from "../components/nav/GuestNav";
import { useAuth } from "../hooks/useAuth";

function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) return <p>loading...</p>;

  const nav = user ? <AuthNav /> : <GuestNav />;
  return (
    <div className="page">
      {nav}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
