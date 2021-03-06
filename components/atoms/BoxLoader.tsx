import React from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const climbingBox = keyframes`
  0% {
    transform: translate(0, -1em) rotate(-45deg)
  }
  5% {
    transform: translate(0, -1em) rotate(-50deg)
  }
  20% {
    transform: translate(1em, -2em) rotate(47deg)
  }
  25% {
    transform: translate(1em, -2em) rotate(45deg)
  }
  30% {
    transform: translate(1em, -2em) rotate(40deg)
  }
  45% {
    transform: translate(2em, -3em) rotate(137deg)
  }
  50% {
    transform: translate(2em, -3em) rotate(135deg)
  }
  55% {
    transform: translate(2em, -3em) rotate(130deg)
  }
  70% {
    transform: translate(3em, -4em) rotate(217deg)
  }
  75% {
    transform: translate(3em, -4em) rotate(220deg)
  }
  100% {
    transform: translate(0, -1em) rotate(-225deg)
  }
`;

const _Container = styled.div`
  position: relative;
  width: 7.1em;
  height: 7.1em;
`;

const _Wrapper = styled.div<{ size: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2.7em;
  margin-left: -2.7em;
  width: 5.4em;
  height: 5.4em;
  font-size: ${({ size }) => size};
`;

const _Hill = styled.div<{ color: string }>`
  position: absolute;
  width: 7.1em;
  height: 7.1em;
  top: 1.7em;
  left: 1.7em;
  border-left: 0.25em solid ${({ color }) => color};
  transform: rotate(45deg);
`;

const _Box = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  bottom: -0.1em;
  height: 1em;
  width: 1em;
  background-color: transparent;
  border-radius: 15%;
  border: 0.25em solid ${({ color }) => color};
  transform: translate(0, -1em) rotate(-45deg);
  animation-fill-mode: both;
  animation: ${climbingBox} 2.5s infinite cubic-bezier(0.79, 0, 0.47, 0.97);
`;

export const BoxLoader: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <_Container>
    <_Wrapper size={size}>
      <_Box color={color} />
      <_Hill color={color} />
    </_Wrapper>
  </_Container>
);
