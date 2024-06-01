import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@chakra-ui/react";
import { toggleTheme } from "../../Redux/store/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className={`navbar ${theme}`}>
      <h1>App Logo</h1>
      {/* <div> */}
      <Switch size="lg" onChange={handleToggle} />
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
