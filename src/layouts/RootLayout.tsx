import { Outlet } from "react-router";
import AuthNav from "../components/nav/AuthNav";
import GuestNav from "../components/nav/GuestNav";
import { useAuth } from "../hooks/useAuth";

function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) return <p>loading...</p>;

  const nav = user ? <AuthNav /> : <GuestNav />;
  return (
    <div className="page relative">
      <div className="fixed top-0 left-0 w-full bg-white z-50">{nav}</div>

      <main className="absolute top-16 py-4 left-0 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
