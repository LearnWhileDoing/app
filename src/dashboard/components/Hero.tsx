import React, { useRef } from "react";

import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { interval, Subject } from "rxjs";
import { debounce } from "rxjs/operators";

import { useBreakpointSpy } from "~/ctrl/providers/breakpointSpy";
import AuthService from "~/ctrl/services/auth";
import UserService from "~/ctrl/services/user";
import { useUserData, useUserId } from "~/ctrl/store/user";

export const Hero = () => {
  const { md: isLargerThanMD } = useBreakpointSpy();

  const userData = useUserData();
  const userId = useUserId();

  const userName = userData?.name;
  const userNameEdit$ = useRef(new Subject<string>());
  userNameEdit$.current.pipe(debounce(() => interval(500))).subscribe(value => {
    userName !== value && UserService.update({ name: value });
  });

  return (
    <>
      <Flex
        w={"100%"}
        pt={36}
        pb={16}
        backgroundImage={"linear-gradient(90deg, #1E40AD 0%, #4255BD 100%)"}
        display={"inline-flex"}
        justify={"center"}
        align={"center"}
      >
        <HStack px={8}>
          {isLargerThanMD && (
            <HStack pr={8}>
              <Flex borderRadius={"full"} h={36} w={36} bg={"white"} shadow={"xl"} align={"center"} justify={"center"}>
                <Text fontSize={"5rem"}>👋</Text>
              </Flex>
            </HStack>
          )}
          <Box>
            <Text as={"h1"} fontSize={{ base: "4xl", md: "5xl" }} color={"white"} lineHeight={"shorter"} mb={4}>
              Welcome to <b>LearnWhileDoing!</b>
            </Text>
            {!userId ? (
              <Button colorScheme={"green"} onClick={() => AuthService.authWithGoogle()}>
                <Text fontSize={{ base: "lg", md: "xl" }}>Connect your account</Text>
              </Button>
            ) : (
              <Button colorScheme={"red"} onClick={() => AuthService.signOut()}>
                <Text fontSize={{ base: "lg", md: "xl" }}>Log out</Text>
              </Button>
            )}
          </Box>
        </HStack>
      </Flex>
    </>
  );
};
