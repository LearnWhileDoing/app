import React from "react";
import Ink from "react-ink";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import { css } from "@emotion/css";
import Link from "next/link";

const _Button = styled.a(
  style.merge(
    style.layout({
      display: "flex",
      position: "relative",
    }),
    style.boxAlignment({
      justifyContent: "center",
    }),
    style.spacing({
      paddingTop: theme.spacing["2"],
      paddingBottom: theme.spacing["2"],
    }),
    style.typography({
      size: theme.typography.size.sm,
      weight: theme.typography.weight.medium,
      color: "white",
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.effects({
      boxShadow: theme.boxShadow.DEFAULT,
      cursor: "pointer",
    }),
    {
      "-webkit-tap-highlight-color": "transparent",
      ":active": style.effects({
        boxShadow: theme.boxShadow.md,
      }),
      ":focus": style.effects({
        outline: "none",
      }),
    }
  )
);

export const IconButton: React.FC<{
  className?: string;
  icon: React.FC<{ className: string }>;
  color: string;
  href?: string;
  onClick?: () => void;
}> = ({ className, icon, color, href, onClick }) => {
  const button = (
    <_Button
      onClick={onClick}
      href={href}
      target={href?.includes("://") ? "_blank" : "_self"}
      css={{
        backgroundColor: theme.color[color]["600"],
        ":hover": style.background({ color: theme.color[color]["700"] }),
      }}
      className={className}
    >
      {React.createElement(icon, {
        className: css({
          height: theme.spacing["5"],
          width: theme.spacing["5"],
          color: "white",
        }),
      })}
      <Ink style={{ color: theme.color[color]["900"] }} />
    </_Button>
  );

  return href ? <Link href={href || ""}>{button}</Link> : button;
};
