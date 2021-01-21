import React from "react";
import Ink from "react-ink";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import tinycolor from "tinycolor2";
import { css } from "@emotion/css";
import { Switch } from "@util/expressions";

const _Wrapper = styled.button(
  style.merge(
    style.layout({
      display: "flex",
      position: "relative",
    }),
    style.sizing({
      width: "100%",
    }),
    style.border({
      style: "solid",
      width: 0,
      widthLeft: theme.spacing["1"],
      color: "transparent",
      radius: 0,
    }),
    style.spacing({
      paddingLeft: theme.spacing["3"],
      paddingRight: theme.spacing["3"],
      paddingTop: theme.spacing["2"],
      paddingBottom: theme.spacing["2"],
    }),
    style.boxAlignment({
      alignItems: "center",
    }),
    style.effects({
      cursor: "pointer",
    })
  )
);

const _wrapperHover = (color: string) =>
  style.merge(
    style.background({
      color: tinycolor(theme.color[color]["500"]).setAlpha(0.1).toString(),
    }),
    style.border({
      color: tinycolor(theme.color[color]["500"]).setAlpha(0.1).toString(),
    })
  );

const _wrapperActive = (color: string) =>
  style.merge(
    style.background({
      color: tinycolor(theme.color[color]["500"]).setAlpha(0.1).toString(),
    }),
    style.effects({
      outline: "none",
    }),
    style.border({
      color: theme.color[color]["500"],
    })
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

const _Text = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      weight: theme.typography.weight.medium,
      size: theme.typography.size.base,
      align: "left",
    })
  )
);

const InactiveIcons = {
  page: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  folder: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
        clipRule="evenodd"
      />
      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
    </svg>
  ),
};

const ActiveIcons = {
  page: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  ),
  folder: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
        clipRule="evenodd"
      />
      <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
    </svg>
  ),
};

export const TOCItem: React.FC<{
  type: "page" | "folder" | "quiz" | "certificate";
  text: string;
  active: boolean;
  onClick: () => void;
  level: number;
}> = ({ type, text, active, onClick, level }) => {
  const color = Switch(type)
    .case("page", "indigo")
    .case("folder", "teal")
    .case("quiz", "orange")
    .case("certificate", "purple")();
  return (
    <_Wrapper
      onClick={onClick}
      css={{
        ":hover": _wrapperHover(color),
        ":focus": _wrapperActive(color),
      }}
    >
      <_Icon>
        {React.createElement(InactiveIcons[type], {
          className: css({
            color: active ? theme.color[color]["700"] : theme.color.grey[`${9 - level * 3}00`],
            strokeWidth: 2.5,
            width: theme.spacing["5"],
          }),
        })}
      </_Icon>
      <_Text
        css={style.merge(
          style.typography({
            color: theme.color.grey[`${9 - level * 3}00`],
            size: level == 0 ? theme.typography.size.base : theme.typography.size.sm,
          }),
          active &&
            style.typography({
              color: theme.color[color]["800"],
            })
        )}
      >
        {text}
      </_Text>
      <Ink style={{ color: theme.color[color]["900"] }} />
    </_Wrapper>
  );
};
