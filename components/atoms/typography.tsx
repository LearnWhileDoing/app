import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

export const Overline = styled.p(
  style.merge(
    style.spacing({
      margin: 0,
    }),
    style.typography({
      align: "left",
      size: theme.typography.size.sm,
      weight: theme.typography.weight.medium,
      color: theme.color.grey["500"],
      transform: "uppercase",
      tracking: theme.typography.letterSpacing.wider,
    })
  )
);
