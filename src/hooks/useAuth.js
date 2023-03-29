import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, accessToken } = useSelector((state) => state.auth) || {};

  if (user && accessToken) return true;
  return false;
};

export default useAuth;
