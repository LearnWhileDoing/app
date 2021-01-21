import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import store from "@util/store";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
      zIndex: 5,
    }),
    style.boxAlignment({
      alignItems: "center",
      justifyContent: "center",
    }),
    style.flexbox({
      shrink: 0,
    }),
    style.sizing({
      height: theme.spacing["20"],
      width: "100%",
    }),
    style.effects({
      boxShadow: theme.boxShadow.md,
    }),
    style.spacing({
      paddingLeft: theme.spacing["6"],
      paddingRight: theme.spacing["6"],
    }),
    style.background({
      color: theme.color.grey["100"],
    })
  )
);

const _IconWrapper = styled.div({
  padding: theme.spacing["2"],
  backgroundColor: theme.color.grey["100"],
  borderRadius: theme.borderRadius.DEFAULT,
  marginRight: theme.spacing["4"],
  "> img": { width: theme.spacing["10"], height: theme.spacing["10"] },
  [`@media(max-width: ${theme.breakpoint.sm})`]: {
    padding: theme.spacing["1.5"],
    backgroundColor: theme.color.grey["100"],
    borderRadius: theme.borderRadius.DEFAULT,
    marginRight: theme.spacing["4"],
    "> img": { width: theme.spacing["9"], height: theme.spacing["9"] },
  },
});

const _Title = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      size: theme.typography.size["2xl"],
      weight: theme.typography.weight.bold,
      overflow: "truncate",
      color: theme.color.grey["100"],
    }),
    {
      [`@media(max-width: ${theme.breakpoint.sm})`]: style.typography({
        size: theme.typography.size.xl,
      }),
    }
  )
);

const _Subtitle = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
      marginTop: `-${theme.spacing["1"]}`,
    }),
    style.typography({
      size: theme.typography.size.sm,
      weight: theme.typography.weight.normal,
      overflow: "truncate",
      color: theme.color.grey["100"],
    }),
    {
      [`@media(max-width: ${theme.breakpoint.sm})`]: style.typography({
        size: theme.typography.size.sm,
      }),
    }
  )
);

export const ForContent: React.FC<{ id: string }> = ({ id }) => {
  const courses = { ...store.database.basicModules, ...store.database.projects };
  return (
    <_Wrapper css={{ backgroundColor: courses[id].color }}>
      <_IconWrapper>
        <img src={`https://raw.githubusercontent.com/LearnWhileDoing/${id}/main/icon.png`} />
      </_IconWrapper>
      <div>
        <_Title>{courses[id].name}</_Title>
        <_Subtitle>by LearnWhileDoing</_Subtitle>
      </div>
    </_Wrapper>
  );
};
