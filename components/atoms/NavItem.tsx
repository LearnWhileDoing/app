import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import React from "react";
import Link from "next/link";

const _NavItem = styled.div<{ active: boolean }>(({ active }) =>
  style.merge(
    style.sizing({
      height: theme.spacing["10"],
    }),
    style.spacing({ paddingLeft: theme.spacing["3"], paddingRight: theme.spacing["3"] }),
    style.typography({
      color: "white",
      weight: theme.typography.weight.medium,
      size: theme.typography.size.sm,
      transform: "uppercase",
      tracking: theme.typography.letterSpacing.wide,
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.background({
      color: active ? theme.color.indigo["800"] : "transparent",
    }),
    style.layout({
      display: "flex",
    }),
    style.boxAlignment({
      alignItems: "center",
    }),
    {
      verticalAlign: "middle",
    }
  )
);

export const NavItem: React.FC<{ href: string; active?: boolean }> = ({ href, active, children }) => {
  return (
    <_NavItem active={active}>
      <Link href={href}>
        <a css={style.merge(style.typography({ overflow: "nowrap" }))} href={href}>
          {children}
        </a>
      </Link>
    </_NavItem>
  );
};
