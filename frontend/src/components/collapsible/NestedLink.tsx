import { Button, defineStyle } from "@chakra-ui/react";
import { NavLink } from "react-router";
import { ReactNode } from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  children: ReactNode;
  path: string;
  toolMessage?: string;
  isMain?: boolean;
}

const NestedLink = ({
  children,
  path,
  toolMessage = "",
  isMain = false,
}: Props) => {
  const singleBtn = defineStyle({
    justifyContent: "start",
    w: "full",
    color: "gray.400",
    bg: "transparent",
    "&.active, &:hover": {
      bg: "blue.700/25",
      color: "blue.400",
    },
    borderLeft: !isMain ? "4px solid" : "0px",
    borderColor: "transparent",
    "&.active": {
      bg: isMain ? "blue.700" : "",
      borderLeftColor: "blue.400",
      color: isMain ? "white" : "",
    },
  });
  if (!toolMessage)
    return (
      <Button {...singleBtn} size="sm" asChild>
        <NavLink end to={path}>
          {children}
        </NavLink>
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
      <Button {...singleBtn} size="sm" asChild>
        <NavLink
          to={{
            pathname: path,
          }}
          end
        >
          {children}
        </NavLink>
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
