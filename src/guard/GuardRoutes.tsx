import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const GuardRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);

  return <>{auth.nickname ? <Outlet /> : <Navigate to="login" />}</>;
};

export default GuardRoutes;
