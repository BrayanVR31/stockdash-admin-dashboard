import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { ReactNode } from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  children: ReactNode;
  path: string;
  toolMessage?: string;
}

const NestedLink = ({ children, path, toolMessage = "" }: Props) => {
  if (!toolMessage)
    return (
      <Button
        justifyContent="start"
        w="full"
        size="sm"
        colorPalette="purple"
        color={{
          _light: "purple.200",
          _dark: "purple.300/70",
        }}
        bg="transparent"
        _hover={{
          _light: {
            bg: "purple.900",
          },
          _dark: {
            bg: "purple.800",
            color: "purple.300",
          },
        }}
        asChild
      >
        <NavLink to={path}>{children}</NavLink>
      </Button>
    );
  return (
    <Tooltip
      showArrow
      content={toolMessage}
      contentProps={{
        css: {
          _light: {
            "--tooltip-bg": "colors.pink.600",
          },
          _dark: {
            "--tooltip-bg": "colors.pink.400",
          },
        },
      }}
      positioning={{
        placement: "left-end",
      }}
    >
      <Button
        colorPalette="purple"
        color={{
          _light: "purple.200",
          _dark: "purple.400/70",
        }}
        bg="transparent"
        _hover={{
          _light: {
            bg: "purple.900",
          },
          _dark: {
            bg: "purple.800",
            color: "purple.300",
          },
        }}
        justifyContent="start"
        w="full"
        size="sm"
        asChild
      >
        <NavLink to={path}>{children}</NavLink>
      </Button>
    </Tooltip>
  );
};

/**
p={3}
fontSize="sm"
rounded="sm"
textDecoration="none"
color="gray.300/90"
_hover={{
  _dark: {
    "&:not(.active)": {
      background: "gray.400/30",
      color: "gray.100",
    },
  },
}}
css={{
  "&.active": {
    _dark: {
      background: "purple.800/80",
      color: "purple.300",
    },
  },
}}
transition="colors 0.5s"

asChild

*/

export { NestedLink };
