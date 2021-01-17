import React from "react";
import { Logo } from "../atoms";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Wrapper = styled.div({
  background: theme.color.grey["100"],
  flexShrink: 0,
  height: "100%",
  width: theme.spacing["72"],
});

const _Items = styled.div(
  style.merge(
    style.spacing({
      paddingTop: theme.spacing["4"],
      paddingLeft: theme.spacing["4"],
      paddingRight: theme.spacing["4"],
    }),
    style.border({
      style: "solid",
      width: 0,
      widthRight: 1,
      color: theme.color.grey["200"],
    })
  )
);

const Drawer: React.FC = ({ children }) => (
  <_Wrapper>
    <Logo />
    <_Items>{children}</_Items>
  </_Wrapper>
);

export default Drawer;
