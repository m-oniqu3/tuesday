import { toast } from "sonner";
import Button from "../components/Button";
import { logout } from "../services/auth";

function Home() {
  async function handleLogout() {
    try {
      await logout();

      toast.success("Logged out");
    } catch {
      toast.error("Unable to logout");
    }
  }
  return (
    <main>
      <Button onClick={handleLogout}>logout</Button>
    </main>
  );
}

export default Home;
