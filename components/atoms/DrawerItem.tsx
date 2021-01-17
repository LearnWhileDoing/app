import React from "react";
import Ink from "react-ink";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import tinycolor from "tinycolor2";
import { css } from "@emotion/css";
import Link from "next/link";

const _Wrapper = styled.a(
  style.merge(
    style.layout({
      display: "flex",
      position: "relative",
    }),
    style.boxAlignment({
      alignItems: "center",
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.spacing({
      padding: theme.spacing["3"],
      marginTop: theme.spacing["2"],
      marginBottom: theme.spacing["2"],
    }),
    style.effects({
      cursor: "pointer",
    })
  )
);

const _Icon = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.boxAlignment({
      alignItems: "center",
    }),
    style.spacing({
      paddingRight: theme.spacing["3"],
    })
  )
);

const _Text = styled.div(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      weight: theme.typography.weight.medium,
      color: theme.color.grey["800"],
      size: theme.typography.size.base,
    })
  )
);

export const DrawerItem: React.FC<{
  leading: ({ className: string }) => JSX.Element;
  text: string;
  active: boolean;
  color?: string;
  href?: string;
}> = ({ leading, text, active, color, href }) => {
  color = color || "blue";
  return (
    <Link href={href || ""}>
      <_Wrapper
        href={href || ""}
        css={style.merge(
          active &&
            style.background({
              color: tinycolor(theme.color[color]["600"]).setAlpha(0.1).toString(),
            }),
          {
            ":hover": style.merge(
              style.background({
                color: tinycolor(theme.color[color]["600"]).setAlpha(0.1).toString(),
              })
            ),
          }
        )}
      >
        <_Icon>
          {React.createElement(leading, {
            className: css({
              color: active && theme.color[color]["800"],
              strokeWidth: 2.5,
              width: theme.spacing["8"],
            }),
          })}
        </_Icon>
        <_Text
          css={
            active &&
            style.typography({
              color: theme.color[color]["800"],
            })
          }
        >
          {text}
        </_Text>
        <Ink style={{ color: theme.color[color]["900"] }} />
      </_Wrapper>
    </Link>
  );
};
