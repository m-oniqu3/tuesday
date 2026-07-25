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
    <div>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default Home;
