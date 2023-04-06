import { useSelector } from "react-redux";

const useAuth = (role) => {
  const { user, accessToken } = useSelector((state) => state.auth) || {};
  
  if (user && accessToken && user.role === role) return true;
  return false;
};

export default useAuth;
