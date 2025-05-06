import { Menu, Box } from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router";
import { useLogOut } from "@/hooks/useAuth";

const MenuOptions = () => {
  const destroySession = useLogOut();
  return (
    <Menu.Content>
      <Menu.Item value="view-profile">
        <CgProfile />
        <NavLink to="/dashboard/account">Ver perfil</NavLink>
      </Menu.Item>
      <Menu.Item onClick={() => destroySession()} value="logout">
        <TbLogout />
        <Box flex="1">Salir de sesión</Box>
      </Menu.Item>
    </Menu.Content>
  );
};

export default MenuOptions;
