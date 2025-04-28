import { ReactNode } from "react";
import { Collapsible, Button } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

interface Props {
  children: ReactNode;
  toolMessage?: string;
}

const CollapseButton = ({ children, toolMessage }: Props) => {
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
            data-link="sidebar-link"
            justifyContent="start"
            w="full"
            size="sm"
          >
            {children}
          </Button>
        </Collapsible.Trigger>
      </Tooltip>
    );
  return (
    <Collapsible.Trigger asChild>
      <Button
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
        data-link="sidebar-link"
        justifyContent="start"
        w="full"
        size="sm"
      >
        {children}
      </Button>
    </Collapsible.Trigger>
  );
};

export { CollapseButton };
