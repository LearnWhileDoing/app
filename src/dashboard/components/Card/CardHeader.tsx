import React from "react";

import { Box, Text } from "@chakra-ui/react";

import theme from "~/core/util/theme";

export const CardHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Box bg={"white"} borderBottom={"1px solid " + theme.colors.gray["200"]} py={3} px={6}>
    <Text fontSize={"xl"} fontWeight={"semibold"} isTruncated={true}>
      {children}
    </Text>
  </Box>
);
