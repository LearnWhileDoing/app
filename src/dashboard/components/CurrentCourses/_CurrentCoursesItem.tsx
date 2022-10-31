import React from "react";

import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

interface _CurrentCoursesItemProps {
  href: string;
  icon: JSX.Element;
  name: string;
  color: string;
  completion: number;
}

export const _CurrentCoursesItem: React.FC<{ children?: React.ReactNode } & _CurrentCoursesItemProps> = ({
  href,
  icon,
  name,
  color,
  completion,
}) => (
  <NextLink href={href} passHref>
    <Link w={"100%"} px={8} py={3} _hover={{ textDecor: "none", bg: "gray.100" }}>
      <HStack spacing={4}>
        {icon}
        <VStack spacing={0} align={"start"}>
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {name}
          </Text>
          <Text fontWeight={"semibold"} color={color}>
            {!!completion || completion === 0 ? (
              <>
                <b>{(completion * 100).toFixed(0)}%</b> complete
              </>
            ) : (
              "Loading..."
            )}
          </Text>
        </VStack>
      </HStack>
    </Link>
  </NextLink>
);
