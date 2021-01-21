import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import React from "react";
import { css } from "@emotion/css";
import { style, theme } from "@util/theme";
import { Switch } from "@util/expressions/switch";
import { Code } from "@atlaskit/code";

const margin = style.spacing({
  marginBottom: theme.spacing["2"],
});

const renderers = {
  paragraph: ({ children }) => <p css={style.merge(margin)}>{children}</p>,
  heading: ({ level, children }) =>
    React.createElement(
      `h${level}`,
      {
        className: css(
          style.merge(
            style.typography({
              weight: theme.typography.weight.medium,
              size: Switch(level)
                .case(1, theme.typography.size["4xl"])
                .case(2, theme.typography.size["3xl"])
                .case(3, theme.typography.size["2xl"])
                .case(4, theme.typography.size["xl"])
                .case(5, theme.typography.size["lg"])(),
            }),
            style.spacing({
              marginTop: theme.spacing["4"],
              marginBottom: theme.spacing["4"],
            }),
            margin,
            level < 3 &&
              style.merge(
                style.border({
                  style: "solid",
                  widthBottom: 1,
                  color: theme.color.grey["200"],
                }),
                style.spacing({
                  paddingBottom: theme.spacing["2"],
                  marginTop: theme.spacing["6"],
                  marginBottom: theme.spacing["6"],
                })
              )
          )
        ),
      },
      children
    ),
  list: ({ ordered, children }) =>
    React.createElement(
      ordered ? "ol" : "ul",
      {
        className: css(
          style.merge(
            !ordered && {
              "> li:before": {
                content: `"\\2022"`,
                fontWeight: theme.typography.weight.bold,
                fontSize: theme.typography.size.xl,
                color: theme.color.grey["400"],
                paddingRight: theme.spacing["2"],
              },
            },
            ordered && {
              counterReset: "item",
              "> li:before": {
                content: `counter(item) ". "`,
                fontWeight: theme.typography.weight.bold,
                fontSize: theme.typography.size.xl,
                color: theme.color.grey["400"],
                paddingRight: theme.spacing["2"],
              },
            }
          )
        ),
      },
      children
    ),
  listItem: ({ children }) => <li css={style.merge(margin)}>{children}</li>,
  inlineCode: ({ children }) => <Code language={"text"} text={children} />,
};

export const MarkdownRenderer: React.FC<{ markdown: string }> = ({ markdown }) => (
  <>
    <ReactMarkdown plugins={[gfm]} children={markdown} renderers={renderers} />
    <style jsx>{`
      h2 {
        color: red;
      }
    `}</style>
  </>
);
