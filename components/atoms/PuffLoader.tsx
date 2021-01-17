import React from "react";
import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

const puff = [
  keyframes`
    0% {
      transform: scale(0)
    }
    100% {
      transform: scale(1.0)
    }
  `,
  keyframes`
    0% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  `,
];

const _Container = styled.div<{ size: string }>`
  position: relative;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;

const _Puff = styled.div<{ size: string; color: string; i: number }>`
  position: absolute;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border: thick solid ${({ color }) => color};
  border-radius: 50%;
  opacity: 1;
  top: 0;
  left: 0;
  animation-fill-mode: both;
  animation: ${puff[0]}, ${puff[1]};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.3, 0.61, 0.355, 1);
  animation-delay: ${({ i }) => (i === 1 ? "-1s" : "0s")};
`;

export const PuffLoader: React.FC<{ color: string; size: string }> = ({ color, size }) => (
  <_Container size={size}>
    <_Puff size={size} color={color} i={0} />
    <_Puff size={size} color={color} i={1} />
  </_Container>
);
