import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      display: "flex",
      position: "relative",
    }),
    style.spacing({
      marginTop: theme.spacing["1"],
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.effects({
      boxShadow: theme.boxShadow.sm,
    })
  )
);

const _Leading = styled.div(
  style.merge(
    style.layout({
      display: "flex",
      position: "absolute",
      top: 0,
      bottom: 0,
    }),
    style.spacing({
      paddingLeft: theme.spacing["4"],
    }),
    style.boxAlignment({
      alignItems: "center",
    })
  )
);

const _Input = styled.input(
  /*tw`focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 pl-9 pr-4 border-solid border border-gray-300 rounded-md outline-none text-base placeholder-gray-400`,*/
  {
    fontFamily: "Inter",
  }
);

export const Input: React.FC<{
  className?: string;
  placeholder: string;
}> = ({ className, placeholder }) => (
  <div className={className}>
    <_Wrapper>
      <_Leading>
        <span className={"text-gray-400 font-medium text-base"}>$</span>
      </_Leading>
      <_Input type="text" placeholder={placeholder} />
    </_Wrapper>
  </div>
);
