import { style, theme } from "@util/theme";
import styled from "@emotion/styled";
import { useWindowScroll, useWindowSize } from "react-use";
import { NavItem } from "@components/atoms/NavItem";
import { useRouter } from "next/router";
import tinycolor from "tinycolor2";

export const navGradient = `linear-gradient(90deg, ${theme.color.indigo["700"]} 0%, ${theme.color.indigo["800"]} 100%)`;

const _Wrapper = styled.div(
  style.merge(
    style.layout({
      position: "fixed",
      zIndex: 20,
      overflow: "scroll",
    }),
    style.background({
      image: navGradient,
    }),
    style.sizing({
      height: theme.spacing["20"],
      width: "100%",
    })
  )
);

const _Logo = styled.p(
  style.merge(
    style.typography({
      color: "white",
      size: theme.typography.size["2xl"],
      weight: theme.typography.weight.semibold,
    }),
    style.spacing({
      marginRight: theme.spacing["4"],
    }),
    style.effects({
      cursor: "default",
      userSelect: "none",
    }),
    {
      [`@media(max-width:${theme.breakpoint.md})`]: {
        color: "#AEBFE0",
        fontSize: theme.typography.size["3xl"],
        ":hover": style.typography({
          color: "white",
        }),
      },
    }
  )
);

const _InputWrapper = styled.div(
  style.merge(
    style.layout({
      position: "relative",
    }),
    style.background({
      color: tinycolor(theme.color.grey["900"]).setAlpha(0.2).toString(),
    }),
    style.border({
      radius: theme.borderRadius.md,
    }),
    style.sizing({
      height: theme.spacing["10"],
      width: theme.spacing["72"],
    }),
    style.flexbox({
      grow: 1,
    })
  )
);

const _LeadingIconWrapper = styled.div(
  style.merge(
    style.layout({
      position: "absolute",
      top: theme.spacing["2.5"],
      left: theme.spacing["2.5"],
    }),
    style.sizing({
      height: theme.spacing["5"],
      width: theme.spacing["5"],
    })
  )
);

const _Input = styled.input(
  style.merge(
    style.sizing({
      width: "100%",
      height: "100%",
    }),
    style.spacing({
      paddingLeft: theme.spacing["10"],
      paddingRight: theme.spacing["2"],
    }),
    style.background({
      color: "transparent",
    }),
    style.typography({
      family: "inherit",
      color: "white",
    }),
    style.border({
      width: 1,
      color: "transparent",
      radius: theme.borderRadius.md,
    }),
    {
      ":focus": style.merge(
        style.background({
          color: tinycolor(theme.color.grey["200"]).setAlpha(0.2).toString(),
        }),
        style.effects({ outline: "none" })
      ),
      "::placeholder": style.typography({ color: theme.color.grey["200"] }),
    }
  )
);

export const Nav: React.FC<{ elevatedAt?: number }> = ({ elevatedAt }) => {
  const { pathname } = useRouter();
  const scroll = useWindowScroll();
  const { width } = useWindowSize();

  const elevated = elevatedAt ? scroll.y >= elevatedAt : true;

  return (
    <_Wrapper css={elevated && { boxShadow: theme.boxShadow.md }}>
      <div
        css={{
          display: "inline-flex",
          alignItems: "center",
          paddingLeft: theme.spacing["8"],
          paddingRight: theme.spacing["8"],
          paddingTop: theme.spacing["4"],
          paddingBottom: theme.spacing["4"],
          height: "100%",
          minWidth: "100%",
        }}
      >
        <div
          css={style.merge(
            style.layout({ display: "flex" }),
            style.boxAlignment({ alignItems: "center" }),
            style.spacing({ spacingX: theme.spacing["1"] }),
            style.flexbox({ grow: 1 })
          )}
        >
          <_Logo>{width >= 768 ? "LearnWhileDoing" : "LWD"}</_Logo>
          <NavItem href={"/"} active={pathname === "/"}>
            Dashboard
          </NavItem>
          <NavItem href={"/completed"} active={pathname === "/completed"}>
            Completed Courses
          </NavItem>
          <NavItem href={"/certificates"} active={pathname === "/certificates"}>
            Certificates
          </NavItem>
        </div>
        <div
          css={style.merge(
            style.spacing({
              marginLeft: theme.spacing["2"],
              spacingX: theme.spacing["1"],
            })
          )}
        >
          <_InputWrapper>
            <_LeadingIconWrapper>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                css={{ width: theme.spacing["5"], color: theme.color.grey["200"] }}
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </_LeadingIconWrapper>
            <_Input placeholder={"Search..."} />
          </_InputWrapper>
        </div>
      </div>
    </_Wrapper>
  );
};
