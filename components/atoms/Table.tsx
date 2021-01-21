import Course from "@util/types/course";
import { style, theme } from "@util/theme";
import { Overline } from "@components/atoms/typography";
import { CourseItem } from "@components/atoms/CourseItem";
import React from "react";
import styled from "@emotion/styled";

const _Table = styled.table({
  minWidth: "100%",
  borderCollapse: "collapse",
});

export const Table: React.FC<{ title: string; items: { [p: string]: Course }; className?: string }> = ({
  title,
  items,
  className,
}) => (
  <_Table className={className}>
    <thead className={"border-solid border border-l-0 border-r-0 border-gray-200"}>
      <tr className={"bg-gray-50"}>
        <th scope="col" css={style.spacing({ paddingLeft: theme.spacing["8"], paddingY: theme.spacing["3"] })}>
          <Overline>{title}</Overline>
        </th>
        <th scope="col" css={style.spacing({ paddingY: theme.spacing["3"] })}>
          <Overline>TAGS</Overline>
        </th>
      </tr>
    </thead>
    <tbody className={"divide-y divide-gray-200"}>
      {Object.entries(items).map((v) => (
        <CourseItem id={v[0]} name={v[1].name} tags={v[1].tags} />
      ))}
    </tbody>
  </_Table>
);
