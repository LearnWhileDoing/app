import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.flexbox({
      direction: "column",
    }),
    style.boxAlignment({
      alignItems: "center",
    })
  )
);

const _Top = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.boxAlignment({
      justifyContent: "center",
      alignItems: "center",
    })
  )
);

const _Icon = styled.svg(
  style.merge(
    style.sizing({
      height: theme.spacing["16"],
      width: theme.spacing["16"],
    }),
    style.spacing({
      marginRight: theme.spacing["2"],
    }),
    style.typography({
      color: theme.color.orange.a700,
    })
  )
);

const _Points = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      weight: theme.typography.weight.bold,
      size: theme.typography.size["5xl"],
      color: theme.color.orange.a700,
    })
  )
);

const _Description = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      leading: theme.typography.leading.tight,
      size: theme.typography.size.xl,
      color: theme.color.orange.a700,
    })
  )
);

export const KnowledgePoints: React.FC<{ points: number }> = ({ points }) => (
  <_Wrapper>
    <_Top>
      <_Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </_Icon>
      <_Points>{points}</_Points>
    </_Top>
    <_Description>knowledge points</_Description>
  </_Wrapper>
);
