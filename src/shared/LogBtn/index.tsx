import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

import Avatar from "@mui/material/Avatar";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { setAuth } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LogBtn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const authEmail = useSelector((state: RootState) => state.authEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const outAuth = () => {
    signOut(auth).then((data) => {
      console.log(data);
      dispatch(setAuth(""));

      console.log(authEmail);
      navigate("/");
    });
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            outAuth();
            handleClose();
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};
export default LogBtn;
