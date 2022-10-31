import React from "react";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const MainAppbarLink: React.FC<
  { children?: React.ReactNode } & {
    path: string;
    title: string;
  }
> = ({ path, title }) => {
  const { pathname } = useRouter();

  return (
    <Link href={path} passHref>
      <Button as={"a"} isActive={pathname === path} colorScheme={"indigo"}>
        {title}
      </Button>
    </Link>
  );
};
