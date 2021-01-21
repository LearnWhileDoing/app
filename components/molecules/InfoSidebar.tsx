import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _Sidebar = styled.div(
  style.merge(
    style.border({
      style: "solid",
      width: 0,
      widthLeft: 1,
      color: theme.color.grey["200"],
    }),
    style.spacing({
      paddingTop: theme.spacing["6"],
      paddingBottom: theme.spacing["6"],
    }),
    {
      [`@media(min-width: ${theme.breakpoint.xl}),`]: style.merge(
        style.spacing({
          paddingBottom: 0,
          paddingLeft: theme.spacing["6"],
        }),
        style.flexbox({
          grow: 1,
        })
      ),
      [`@media(max-width: ${theme.breakpoint.xl})`]: style.merge(
        style.border({ widthLeft: 0 }),
        style.sizing({
          maxWidth: "60rem",
          width: "100%",
        }),
        style.spacing({
          marginTop: theme.spacing["4"],
          marginBottom: `-${theme.spacing["8"]}`,
        })
      ),
      [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.layout({
        display: "flex",
      }),
    }
  )
);

const _Desc1 = styled.div(
  style.merge(
    style.border({
      style: "solid",
      width: 0,
      widthBottom: 1,
      color: theme.color.grey["200"],
    }),
    style.spacing({
      paddingBottom: theme.spacing["6"],
    }),
    {
      [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.merge(
        style.sizing({
          width: "100%",
        }),
        style.spacing({
          paddingRight: theme.spacing["6"],
          paddingBottom: 0,
        }),
        style.border({
          widthRight: 1,
          widthBottom: 0,
        })
      ),
    }
  )
);

const _Desc1Item: React.FC<{ icon: JSX.Element; color: string }> = ({ icon, color, children }) => (
  <div css={{ display: "flex", marginTop: theme.spacing["1"], marginBottom: theme.spacing["1"] }}>
    <div css={{ color: theme.color[color]["600"] }}>{icon}</div>
    <span
      css={{ color: theme.color[color]["800"], fontSize: theme.typography.size.lg, marginLeft: theme.spacing["2"] }}
    >
      {children}
    </span>
  </div>
);

const _Desc2 = styled.div(
  style.merge({
    [`@media(min-width: ${theme.breakpoint.xl}), (max-width: ${theme.breakpoint.md})`]: style.spacing({
      paddingTop: theme.spacing["6"],
    }),
    [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.merge(
      style.sizing({
        width: "100%",
      }),
      style.spacing({
        paddingLeft: theme.spacing["6"],
      })
    ),
  })
);

const _Desc2Item: React.FC<{ text: string }> = ({ text, children }) => (
  <div>
    <span className={`text-lg text-grey-500`}>{text}</span>
    {children}
  </div>
);

const _Icons = {
  Sections: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={"w-6"}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  ),
  Free: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={"w-6"}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Certificates: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={"w-6"}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
};

export const InfoSidebar: React.FC<{ sections: number; certificates: number }> = ({ sections, certificates }) => (
  <_Sidebar>
    <_Desc1>
      <_Desc1Item color={"green"} icon={<_Icons.Free />}>
        Free forever
      </_Desc1Item>
      <_Desc1Item color={"grey"} icon={<_Icons.Sections />}>
        {sections} sections
      </_Desc1Item>
      <_Desc1Item color={"grey"} icon={<_Icons.Certificates />}>
        {certificates} certificates
      </_Desc1Item>
    </_Desc1>
    <_Desc2>
      <_Desc2Item text={"Authors"}></_Desc2Item>
    </_Desc2>
  </_Sidebar>
);
