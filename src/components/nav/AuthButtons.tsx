import { useNavigate } from "react-router";
import Button from "../Button";

function AuthButtons() {
  const navigate = useNavigate();
  function handleAuth() {
    navigate("/auth");
  }

  return (
    <div className="flex w-fit gap-4">
      <Button onClick={handleAuth} className="hover:bg-neutral-200">
        Log In
      </Button>
      <Button onClick={handleAuth} className="bg-neutral-800 text-white">
        Sign Up
      </Button>
    </div>
  );
}

export default AuthButtons;
