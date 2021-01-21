import { useWindowSize } from "react-use";
import React from "react";
import styled from "@emotion/styled";

const _Wrapper = styled.div({
  display: "flex",
  height: "100%",
  width: "100%",
  overflowX: "hidden",
});

const _Content = styled.div({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  overflow: "hidden",
});

const WithDrawer: React.FC<{ drawer: JSX.Element }> = ({ drawer, children }) => {
  const { width } = useWindowSize();

  const showDrawer = width >= 768;

  return (
    <_Wrapper>
      {showDrawer && drawer}
      <_Content>{children}</_Content>
    </_Wrapper>
  );
};

export default WithDrawer;
