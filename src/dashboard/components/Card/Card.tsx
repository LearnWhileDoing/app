import React from "react";

import { Box } from "@chakra-ui/react";
import tinycolor from "tinycolor2";

import theme from "~/core/util/theme";

interface CardProps {
  interactive?: true;
}

export const Card: React.FC<{ children?: React.ReactNode } & CardProps> = ({ children, interactive }) => (
  <Box
    w={"full"}
    borderRadius={"xl"}
    shadow={!interactive && "base"}
    borderY={undefined}
    bg={"gray.50"}
    overflow={"hidden"}
    position={"relative"}
    border={"1px solid transparent"}
    _hover={
      interactive && {
        shadow: "base",
        bg: "gray.100",
        border: "1px solid",
        borderColor: "gray.200",
      }
    }
    transition={"all 0.15s var(--chakra-transition-easing-ease-out)"}
  >
    <Box
      w={"full"}
      overflow={"overlay"}
      sx={{
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": { background: tinycolor(theme.colors.gray["900"]).setAlpha(0.7).toString() },
        "&::-webkit-scrollbar-track": { background: tinycolor(theme.colors.gray["900"]).setAlpha(0.2).toString() },
      }}
    >
      {children}
    </Box>
  </Box>
);
