import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import React, { useState } from "react";
import { useWindowSize } from "react-use";
import TOC from "@components/organisms/TOC";
import { CourseTOC } from "@util/types/courseTOC";
import { Appbar } from "@components/molecules";

const _Wrapper = styled.div(
  style.merge(
    style.sizing({
      width: "100%",
      height: "100%",
    }),
    style.layout({
      display: "flex",
      position: "fixed",
    }),
    style.flexbox({
      direction: "column",
    }),
    style.background({
      color: theme.color.grey["100"],
    })
  )
);

const _Content = styled.div(
  style.merge(
    style.sizing({
      width: "100%",
      height: "100%",
    }),
    style.layout({
      position: "relative",
    }),
    style.flexbox({
      grow: 1,
    })
  )
);

const _Page = styled.div(
  style.merge(
    style.background({
      color: "white",
    }),
    style.layout({
      position: "absolute",
      zIndex: 3,
    }),
    style.sizing({
      height: "100%",
      width: `calc(100% - ${theme.spacing["10"]})`,
    }),
    style.effects({
      boxShadow: theme.boxShadow.left,
    })
  )
);

const _ToggleButton = styled.button(
  style.merge(
    style.layout({
      display: "flex",
      position: "absolute",
      top: theme.spacing["8"],
      left: `-${theme.spacing["5"]}`,
    }),
    style.boxAlignment({
      alignItems: "center",
      justifyContent: "center",
    }),
    style.background({
      color: "white",
    }),
    style.sizing({
      height: theme.spacing["10"],
      width: theme.spacing["10"],
    }),
    style.effects({
      boxShadow: theme.boxShadow.DEFAULT,
    }),
    style.border({
      style: "solid",
      width: 1,
      color: theme.color.grey["200"],
      radius: "50%",
    }),
    {
      "& svg": {
        color: theme.color.grey["800"],
      },
      ":hover": {
        backgroundColor: theme.color.indigo["700"],
        borderColor: theme.color.indigo["700"],
        "& svg": {
          color: "white",
        },
      },
      ":focus": {
        outline: "none",
      },
    }
  )
);

const WithTOC: React.FC<{ id: string; toc: CourseTOC }> = ({ id, toc }) => {
  const { width } = useWindowSize();
  const isMD = width >= 768;

  const [tocOpen, setTocOpen] = useState(isMD);

  return (
    <_Wrapper>
      <Appbar.ForContent id={id} />
      <_Content>
        <_Page
          css={{
            left: tocOpen ? theme.spacing["72"] : theme.spacing["10"],
          }}
          onClick={(e) => !isMD && setTocOpen(false)}
        >
          <_ToggleButton
            onClick={(e) => {
              e.stopPropagation();
              setTocOpen(!tocOpen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              css={{ width: theme.spacing["6"], height: theme.spacing["6"] }}
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </_ToggleButton>
        </_Page>
        <TOC toc={toc} disabled={!tocOpen} onOverlayClick={() => setTocOpen(!tocOpen)} />
      </_Content>
    </_Wrapper>
  );
};

export default WithTOC;
