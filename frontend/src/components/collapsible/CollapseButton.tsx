import { ReactNode } from "react";
import {
  Collapsible,
  Button,
  defineStyle,
  HStack,
  SystemStyleObject,
} from "@chakra-ui/react";
import { useLocation } from "react-router";
import { FaChevronDown } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  children: ReactNode;
  toolMessage?: string;
  parentPath?: string;
}

type CollapsedBtnStyle = (
  active: boolean,
  state: "open" | "close",
) => SystemStyleObject;

const getCollapsedBtnStyle: CollapsedBtnStyle = (active, state) => {
  return defineStyle({
    bg: active ? "blue.700" : "transparent",
    color: active ? "white" : "gray.300",
    w: "full",
    justifyContent: state === "open" ? "space-between" : "start",
    _hover: {
      bg: active ? "" : "blue.700/25",
      color: active ? "" : "blue.400",
    },
  });
};

const CollapseButton = ({ children, toolMessage, parentPath = "" }: Props) => {
  const { pathname = "" } = useLocation();
  const segments = pathname.split("/").filter((seg) => seg);
  const lastSegment =
    parentPath
      .split("/")
      .filter((seg) => seg)
      .pop() || "";
  const isActive = segments.includes(lastSegment);
  const collapsedBtn = getCollapsedBtnStyle(
    isActive,
    toolMessage ? "close" : "open",
  );

  if (toolMessage)
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
        <Collapsible.Trigger asChild>
          <Button {...collapsedBtn} data-link="sidebar-link" size="sm">
            {children}
          </Button>
        </Collapsible.Trigger>
      </Tooltip>
    );
  return (
    <Collapsible.Trigger asChild>
      <Button
        {...collapsedBtn}
        data-link="sidebar-link"
        size="sm"
        css={{
          "& * + svg": {
            transition: "transform 140ms linear",
          },
          "[data-state=open] & * + svg": {
            transform: "rotate(180deg)",
          },
        }}
      >
        <HStack>{children}</HStack>
        <FaChevronDown style={{ width: "10px" }} />
      </Button>
    </Collapsible.Trigger>
  );
};

export { CollapseButton };
