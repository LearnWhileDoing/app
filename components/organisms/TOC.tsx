import React from "react";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import { DrawerItem, TOCItem } from "@components/atoms";
import { CourseTOC } from "@util/types/courseTOC";
import { Overline } from "@components/atoms/typography";

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      position: "absolute",
    }),
    style.sizing({
      width: theme.spacing["72"],
      height: "100%",
    })
  )
);

const _Overlay = styled.div(
  style.merge(
    style.layout({
      position: "fixed",
      zIndex: 1,
    }),
    style.sizing({
      width: "100%",
      height: "100%",
    })
  )
);

const _TOCSection: React.FC<{ items: Array<string | { [p: string]: string[] }>; level?: number }> = ({
  items,
  level,
}) => (
  <>
    {items.map((page) =>
      typeof page === "string" ? (
        <TOCItem type={"page"} text={page} active={false} onClick={() => {}} level={level || 0} />
      ) : (
        Object.entries(page).map((page) => (
          <>
            <TOCItem type={"folder"} text={page[0]} active={false} onClick={() => {}} level={level || 0} />
            <div css={{ paddingLeft: theme.spacing["4"] }}>
              <_TOCSection items={page[1]} level={(level || 0) + 1} />
            </div>
          </>
        ))
      )
    )}
  </>
);

const TOC: React.FC<{ toc: CourseTOC; disabled: boolean; onOverlayClick: () => void }> = ({
  toc,
  disabled,
  onOverlayClick,
}) => {
  return (
    <_Wrapper style={{ overflowY: !disabled ? "scroll" : "hidden" }}>
      <_Overlay onClick={() => disabled && onOverlayClick()} style={{ visibility: !disabled ? "hidden" : "visible" }} />
      <div css={{ padding: theme.spacing["4"], paddingBottom: 0 }}>
        <DrawerItem
          leading={({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          text={"Back to LWD Home"}
          active={true}
          href={"/"}
        />
      </div>
      {Object.entries(toc).map((section) => (
        <div>
          <Overline
            css={{
              paddingLeft: theme.spacing["4"],
              paddingRight: theme.spacing["4"],
              paddingTop: theme.spacing["6"],
              paddingBottom: theme.spacing["2"],
            }}
          >
            {section[0]}
          </Overline>
          <_TOCSection items={section[1]} />
        </div>
      ))}
    </_Wrapper>
  );
};

export default TOC;
