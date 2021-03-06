import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Container = styled.div(
  //tw`h-20 flex justify-center items-center shadow-md`,
  style.merge(
    style.background({
      color: theme.color.indigo["700"],
    }),
    style.layout({
      display: "flex",
    }),
    style.sizing({
      height: theme.spacing["20"],
    }),
    style.boxAlignment({
      justifyContent: "center",
      alignItems: "center",
    }),
    style.effects({
      boxShadow: theme.boxShadow.md,
    })
  )
);

const _Text = styled.p(
  style.merge(
    style.typography({
      color: "#AEBFE0",
      size: theme.typography.size["5xl"],
      weight: theme.typography.weight.black,
    }),
    {
      ":hover": style.typography({
        color: "white",
      }),
    },
    style.effects({
      cursor: "default",
    })
  )
);

export const Logo = () => (
  <_Container>
    <_Text>LWD</_Text>
  </_Container>
);
