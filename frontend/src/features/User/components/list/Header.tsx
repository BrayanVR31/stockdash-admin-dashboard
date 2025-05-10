import { Text } from "@chakra-ui/react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const Header = () => {
  return (
    <>
      <Breadcrumbs />
      <Text mt="2" fontSize="lg" fontWeight="semibold">
        Gestión de usuarios
      </Text>
    </>
  );
};

export { Header };
