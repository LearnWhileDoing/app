import React from "react";
import { Button } from "../atoms/Button";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.boxAlignment({
      alignItems: "center",
      justifyContent: "between",
    }),
    style.flexbox({
      shrink: 0,
    }),
    style.sizing({
      height: theme.spacing["20"],
      width: "100%",
    }),
    style.border({
      style: "solid",
      width: 0,
      widthBottom: 1,
      color: theme.color.grey["200"],
    }),
    style.spacing({
      paddingLeft: theme.spacing["6"],
      paddingRight: theme.spacing["6"],
    }),
    style.background({
      color: "white",
    })
  )
);

const _InputWrapper = styled.div({
  display: "flex",
  flexGrow: 1,
  position: "relative",
});

const _Leading = styled.div(
  style.merge(
    style.layout({
      position: "absolute",
      display: "flex",
      top: 0,
      bottom: 0,
      left: 0,
    }),
    style.boxAlignment({
      alignItems: "center",
    })
  )
);

const _Input = styled.input(
  style.merge(
    style.layout({
      display: "block",
    }),
    style.sizing({
      width: "100%",
    }),
    style.spacing({
      paddingLeft: theme.spacing["12"],
      paddingRight: theme.spacing["6"],
    }),
    style.typography({
      family: "Inter",
      size: theme.typography.size.base,
      placeholderColor: theme.color.grey["400"],
    }),
    {
      ":focus": style.effects({
        outline: "none",
      }),
    }
  )
);

export const AppbarWithSearch = () => (
  <_Wrapper>
    <_InputWrapper>
      <_Leading>
        <span className={"text-gray-400 font-medium text-base"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={"w-6"}>
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </_Leading>
      <_Input type="text" placeholder={"Search..."} />
    </_InputWrapper>

    <Button
      value={"Login"}
      color={"red"}
      offsetLeft={true}
      leading={({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
          <path
            fillRule="evenodd"
            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    />
  </_Wrapper>
);
