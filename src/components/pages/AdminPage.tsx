import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DrawerComponent from "../widgets/Admin/Drawer";
import AudioUploader from "@/shared/audioUpdater";
import AudioList from "@/shared/AudioList";

const AdminPage = () => {
  const authEmail = useSelector((state: RootState) => state.user.authEmail);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (authEmail) {
  //     if (authEmail === "alisalisamur20@gmail.com") navigate("/admin_panel");
  //     else navigate("/user_panel");
  //   } else navigate("/");
  // }, [authEmail, navigate]);

  useEffect(() => {}, []);
  return (
    <>
      <DrawerComponent>
        <Outlet />
      </DrawerComponent>
    </>
  );
};

export default AdminPage;
