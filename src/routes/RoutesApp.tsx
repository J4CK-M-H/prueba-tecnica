import { Navigate, Route, Routes } from "react-router-dom";
import RegisterUser from "../views/registro/RegisterUser";
import LayoutApp from "../layout/LayoutApp";
import Users from "../views/usuarios/Users";
import Login from "../views/login/Login";
import GuardRoutes from "../guard/GuardRoutes";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const RoutesApp = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);

  return (
    <Routes>
      <Route element={<GuardRoutes />}>
        <Route element={<LayoutApp />}>
          <Route path="/" element={<Navigate to={"registro-usuario"} />} />
          <Route path="/registro-usuario" element={<RegisterUser />} />
          <Route path="/usuarios" element={<Users />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={auth.nickname ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
};

export default RoutesApp;
