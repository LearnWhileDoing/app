import React from "react";
import Ink from "react-ink";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import { css } from "@emotion/css";
import Link from "next/link";

const _Button = styled.a<{ offsetLeft: any }>(({ offsetLeft }) =>
  style.merge(
    style.layout({
      display: "flex",
      position: "relative",
    }),
    style.boxAlignment({
      justifyContent: "center",
    }),
    style.spacing({
      paddingLeft: offsetLeft ? theme.spacing[10] : theme.spacing[4],
      paddingRight: theme.spacing[4],
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
      ":active": style.effects({
        boxShadow: theme.boxShadow.md,
      }),
      ":focus": style.effects({
        outline: "none",
      }),
    }
  )
);

export const Button: React.FC<{
  className?: string;
  leading?: React.FC<{ className: string }>;
  offsetLeft?: boolean;
  value: string;
  color: string;
  href?: string;
}> = ({ className, leading, offsetLeft, value, color, href }) => {
  const button = (
    <_Button
      href={href}
      target={href?.includes("://") ? "_blank" : "_self"}
      offsetLeft={offsetLeft || false}
      css={style.merge(style.typography({ overflow: "no-wrap" }), {
        backgroundColor: theme.color[color]["600"],
        ":hover": style.background({ color: theme.color[color]["700"] }),
      })}
      className={className}
    >
      {leading && (
        <span
          css={style.merge(
            style.layout({
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              display: "flex",
            }),
            style.boxAlignment({
              alignItems: "center",
            }),
            style.spacing({
              paddingLeft: theme.spacing["3"],
            })
          )}
        >
          {React.createElement(leading, {
            className: css({
              height: theme.spacing["5"],
              width: theme.spacing["5"],
              color: "white",
            }),
          })}
        </span>
      )}
      {value}
      <Ink style={{ color: theme.color[color]["900"] }} />
    </_Button>
  );

  return href ? <Link href={href || ""}>{button}</Link> : button;
};
