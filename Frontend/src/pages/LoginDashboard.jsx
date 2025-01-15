import useUserAuth from "../state/useAuth";

function LoginDashboard() {
  const { isAuthenticated, userName } = useUserAuth();
  return (
    <div>
      {isAuthenticated ? <div>Welcome {userName}</div> : <p>Please Login</p>}
    </div>
  );
}

export default LoginDashboard;
