import { useNavigate } from "react-router";
import { signInWithGoogle } from "../services/auth";

function Auth() {
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signInWithGoogle();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button className="cursor-pointer" onClick={handleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Auth;
