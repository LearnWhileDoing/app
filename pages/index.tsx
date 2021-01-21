import React from "react";
import store from "@util/store";
import { Table } from "@components/atoms";
import { style, theme } from "@util/theme";
import styled from "@emotion/styled";
import { CurrentCourses } from "@components/molecules";
import { navGradient } from "@components/molecules/appbar/Nav";
import { UserInfo } from "@components/organisms/UserInfo";

const _Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.color.grey["100"],
  minHeight: "100%",
});

const _ExtendedSpace = styled.div({
  width: "100%",
  height: theme.spacing["24"],
  backgroundImage: navGradient,
});

const _Content = styled.div({
  width: "100%",
  maxWidth: `calc(60rem + ${theme.spacing["8"]})`,
  marginTop: "-" + theme.spacing["16"],
  overflow: "visible",
});

const _HorizontalScroll = styled.div({
  width: "100%",
  overflowX: "scroll",
  overflowY: "visible",
});

const _HorizontalScrollPadding = styled.div({
  display: "inline-block",
  padding: theme.spacing["4"],
  [`@media(max-width: ${theme.breakpoint.md})`]: {
    padding: 0,
  },
});

const _TableWrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
      overflow: "hidden",
    }),
    style.sizing({
      width: "100%",
      minWidth: "60rem",
    }),
    style.flexbox({
      direction: "column",
    }),
    style.border({
      style: "solid",
      width: 1,
      color: theme.color.grey["200"],
      radius: theme.borderRadius.md,
    }),
    style.effects({
      boxShadow: theme.boxShadow.sm,
    }),
    {
      [`@media(max-width: ${theme.breakpoint.md})`]: {
        borderRadius: 0,
      },
    }
  )
);

const Index = () => {
  return (
    <_Wrapper>
      <_ExtendedSpace />
      <_Content>
        <UserInfo />
        <CurrentCourses />
        <_HorizontalScroll>
          <_HorizontalScrollPadding>
            <_TableWrapper>
              <Table title={"Projects"} items={store.database.projects} css={{ marginTop: "-1px" }} />
              <Table title={"Basic Modules"} items={store.database.basicModules} />
            </_TableWrapper>
          </_HorizontalScrollPadding>
        </_HorizontalScroll>
      </_Content>
    </_Wrapper>
  );
};

export default Index;
