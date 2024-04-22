import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = () => {
  const authEmail = useSelector((state: RootState) => state.user.authEmail);
  const navigate = useNavigate();

  useEffect(() => {
    if (authEmail) {
      if (authEmail === "alisalisamur20@gmail.com") navigate("/admin_panel");
      else navigate("/user_panel");
    } else navigate("/");
  }, [authEmail, navigate]);

  return <></>;
};

export default UserPage;
