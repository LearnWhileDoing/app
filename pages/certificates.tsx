import React from "react";

import { Box, Flex, Grid } from "@chakra-ui/react";
import Head from "next/head";
import { useObservable } from "react-use";

import { MainNavbar } from "~/core/components/MainNavbar";

import UserStore from "~/ctrl/store/user";

import { CertificateDisplay } from "~/certificates/components/CertificateDisplay";
import { Hero } from "~/certificates/components/Hero";

export default function Certificates() {
  const userData = useObservable(UserStore.data$, UserStore.data$.value);

  return (
    <>
      <Head>
        <title>Certificates | LearnWhileDoing</title>
      </Head>
      <>
        <MainNavbar elevatedAt={0} />
        <Hero />
        <Flex direction={"column"} align={"center"} pb={16}>
          <Box maxW={"7xl"} w={"full"} px={8}>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {userData?.completed.certificates
                .map(id => id.split("/"))
                .map(([courseId, certificateId]) => {
                  return <CertificateDisplay courseId={courseId} certificateId={certificateId} />;
                })}
            </Grid>
          </Box>
        </Flex>
      </>
    </>
  );
}
