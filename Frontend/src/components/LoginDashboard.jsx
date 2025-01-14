import useUserAuth from "../state/useAuth";

function LoginDashboard() {
  const { isAuthenticated, userName, logout } = useUserAuth();
  return (
    <div>
      {isAuthenticated ? <div>Welcome {userName}</div> : <p>Please Login</p>}
    </div>
  );
}

export default LoginDashboard;
