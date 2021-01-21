import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";
import store from "@util/store";

const _Row = styled.tr(
  style.merge(
    style.background({
      color: "white",
    }),
    style.border({
      style: "solid",
      width: 0,
      widthBottom: 1,
      color: theme.color.grey["200"],
    }),
    {
      ":hover": style.background({ color: theme.color.grey["100"] }),
    }
  )
);

export const CourseItem: React.FC<{ id: string; name: string; tags: string[] }> = ({ id, name, tags }) => (
  <_Row>
    <td className={"pl-8 pr-6 py-4 whitespace-nowrap w-1/2"}>
      <div className={"h-full flex items-center"}>
        <div className={"flex-shrink-0 h-10 w-10"}>
          <img
            className={"h-10 w-10"}
            src={`https://raw.githubusercontent.com/LearnWhileDoing/${id}/main/icon.png`}
            alt=""
          />
        </div>
        <Link href={"course/" + id}>
          <a className={"ml-4 text-lg text-gray-900"}>{name}</a>
        </Link>
      </div>
    </td>
    <td className={"flex-wrap pr-6 py-4"}>
      {tags.map((t) => (
        <span
          css={style.merge(
            style.spacing({
              paddingLeft: theme.spacing["2"],
              paddingRight: theme.spacing["2"],
              marginLeft: theme.spacing["2"],
              marginRight: theme.spacing["2"],
            }),
            style.layout({
              display: "inline-block",
            }),
            style.typography({
              size: theme.typography.size.xs,
              leading: theme.typography.leading["5"],
              weight: theme.typography.weight.semibold,
              color: theme.color[store.database.tags.list[t].color]["800"],
            }),
            style.border({
              radius: theme.borderRadius.md,
            }),
            style.background({
              color: theme.color[store.database.tags.list[t].color]["200"],
            })
          )}
        >
          {t}
        </span>
      ))}
    </td>
  </_Row>
);
