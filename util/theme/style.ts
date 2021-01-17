import Switch from "@util/expressions/switch";
import * as CSS from "csstype";

const normalize = (attr: string) =>
  attr
    .split(/(?=[A-Z])/)
    .map((v) => v.toLowerCase())
    .join("-");

const createObjectStyles = (styles: any) =>
  Object.entries(styles).reduce((acc, style) => {
    acc[style[0]] = style[1];
    return acc;
  }, {} as any);

type StyleFn<T> = (styles: Partial<T>) => CSS.Properties<any>;

export const layout: StyleFn<{
  display: "block" | "inline-block" | "flex";

  overflow: "auto" | "hidden" | "visible" | "scroll";
  overflowX: "auto" | "hidden" | "visible" | "scroll";
  overflowY: "auto" | "hidden" | "visible" | "scroll";

  position: "fixed" | "absolute" | "relative" | "sticky";

  top: string | number;
  right: string | number;
  bottom: string | number;
  left: string | number;

  zIndex: number;
}> = (styles) => createObjectStyles(styles);

export const flexbox: StyleFn<{
  direction: "row" | "row-reverse" | "column" | "column-reverse";
  wrap: boolean | "reverse";
  flex: 1 | "auto" | "initial" | "none";
  grow: 1 | 0;
  shrink: 1 | 0;
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    acc[
      Switch(style[0])
        .case("flex", "flex")
        .default(`flex${style[0].charAt(0).toUpperCase()}${style[0].slice(1)}`)()
    ] = Switch(style[0])
      .case("wrap", Switch(style[1]).case(true, "wrap").case(false, "nowrap").case("reverse", "wrap-reverse")())
      .case(
        "flex",
        Switch(style[1]).case(1, "1 1 0%").case("auto", "1 1 auto").case("initial", "0 1 auto").case("none", "none")()
      )
      .default(style[1])();
    return acc;
  }, {} as any);

export const boxAlignment: StyleFn<{
  justifyContent: "start" | "end" | "center" | "between" | "around" | "evenly";
  justifyItems: "auto" | "start" | "end" | "center" | "stretch";
  justifySelf: "auto" | "start" | "end" | "center" | "stretch";

  alignContent: "start" | "end" | "center" | "between" | "around" | "evenly";
  alignItems: "auto" | "start" | "end" | "center" | "stretch";
  alignSelf: "auto" | "start" | "end" | "center" | "stretch";

  placeContent: "start" | "end" | "center" | "between" | "around" | "evenly";
  placeItems: "auto" | "start" | "end" | "center" | "stretch";
  placeSelf: "auto" | "start" | "end" | "center" | "stretch";
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    acc[style[0]] = Switch(style[0])
      .case(
        "justifyContent",
        Switch(style[1])
          .case("start", "flex-start")
          .case("end", "flex-end")
          .case("center", "center")
          .case("between", "space-between")
          .case("around", "space-around")
          .case("evenly", "space-evenly")()
      )
      .case(
        "alignContent",
        Switch(style[1])
          .case("start", "flex-start")
          .case("end", "flex-end")
          .case("center", "center")
          .case("between", "space-between")
          .case("around", "space-around")
          .case("evenly", "space-evenly")()
      )
      .case(
        "placeContent",
        Switch(style[1])
          .case("start", "flex-start")
          .case("end", "flex-end")
          .case("center", "center")
          .case("between", "space-between")
          .case("around", "space-around")
          .case("evenly", "space-evenly")()
      )
      .default(style[1])();
    return acc;
  }, {} as any);

export const spacing: StyleFn<{
  padding: string | number;
  paddingTop: string | number;
  paddingRight: string | number;
  paddingBottom: string | number;
  paddingLeft: string | number;

  margin: string | number;
  marginTop: string | number;
  marginRight: string | number;
  marginBottom: string | number;
  marginLeft: string | number;

  spacingX: string | number;
  spacingY: string | number;
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    switch (style[0]) {
      case "spacingX":
        acc = {
          ...acc,
          "> * + *": {
            marginLeft: style[1],
          },
        };
        break;
      case "spacingY":
        acc = {
          ...acc,
          "> * + *": {
            marginTop: style[1],
          },
        };
        break;
      default:
        acc[style[0]] = style[1];
    }
    return acc;
  }, {} as any);

export const sizing: StyleFn<{
  width: string | number;
  minWidth: string | number;
  maxWidth: string | number;
  height: string | number;
  minHeight: string | number;
  maxHeight: string | number;
}> = (styles) => createObjectStyles(styles);

export const typography: StyleFn<{
  family: string;
  size: string;
  weight: string | number;

  italic: boolean;

  tracking: string | number;
  leading: string | number;

  placeholderColor: string;

  align: "left" | "center" | "right" | "justify";
  color: string;
  transform: "uppercase" | "lowercase" | "capitalize" | "none";

  underline: boolean;

  overflow: "truncate" | "ellipsis" | "clip" | "no-wrap";
  verticalAlign: "baseline" | "top" | "middle" | "bottom" | "text-top" | "text-bottom";
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    switch (style[0]) {
      case "family":
      case "size":
      case "weight":
        acc[`font${style[0].charAt(0).toUpperCase()}${style[0].slice(1)}`] = style[1];
        break;
      case "italic":
        acc.fontStyle = style[1] ? "italic" : "normal";
        break;
      case "tracking":
        acc.letterSpacing = style[1];
        break;
      case "leading":
        acc.lineHeight = style[1];
        break;
      case "placeholderColor":
        acc = {
          ...acc,
          "::placeholder": {
            color: style[1],
          },
        };
        break;
      case "align":
      case "transform":
        acc[`text${style[0].charAt(0).toUpperCase()}${style[0].slice(1)}`] = style[1];
        break;
      case "color":
        acc.color = style[1];
        break;
      case "underline":
        acc.textDecoration = style[1] ? "underline" : "none";
        break;
      case "overflow":
        if (style[1] === "truncate") {
          acc = {
            ...acc,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          };
        } else if (style[1] === "no-wrap") {
          acc.whiteSpace = "no-wrap";
        } else {
          acc.textOverflow = style[1];
        }
        break;
      default:
        acc[style[0]] = style[1];
    }
    return acc;
  }, {} as any);

export const background: StyleFn<{
  attachment: "fixed" | "local" | "scroll";
  clip: "border-box" | "padding-box" | "content-box" | "text";
  color: string;
  position: "center" | "top" | "right" | "right bottom" | "right top" | "bottom" | "left" | "left bottom" | "left top";
  repeat: boolean | "x" | "y" | "round" | "space";
  size: "auto" | "cover" | "contain";
  image: string;
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    acc[`background${style[0].charAt(0).toUpperCase()}${style[0].slice(1)}`] = Switch(style[0])
      .case(
        "repeat",
        Switch(style[1])
          .case(true, "repeat")
          .case(false, "no-repeat")
          .case("x", "repeat-x")
          .case("y", "repeat-y")
          .default(style[1])
      )
      .default(style[1])();
    return acc;
  }, {} as any);

export const border: StyleFn<{
  style: "solid" | "dashed" | "dotted" | "double" | "none";
  color: string;

  radius: string | number;
  radiusTop: string | number;
  radiusRight: string | number;
  radiusBottom: string | number;
  radiusLeft: string | number;
  radiusTopLeft: string | number;
  radiusTopRight: string | number;
  radiusBottomLeft: string | number;
  radiusBottomRight: string | number;

  width: string | number;
  widthTop: string | number;
  widthRight: string | number;
  widthBottom: string | number;
  widthLeft: string | number;
}> = (styles) =>
  Object.entries(styles).reduce((acc, style) => {
    switch (style[0]) {
      case "radiusTop":
        acc = {
          ...acc,
          borderTopLeftRadius: style[1],
          borderTopRightRadius: style[1],
        };
        break;
      case "radiusRight":
        acc = {
          ...acc,
          borderTopRightRadius: style[1],
          borderBottomRightRadius: style[1],
        };
        break;
      case "radiusBottom":
        acc = {
          ...acc,
          borderBottomLeftRadius: style[1],
          borderBottomRightRadius: style[1],
        };
        break;
      case "radiusLeft":
        acc = {
          ...acc,
          borderTopLeftRadius: style[1],
          borderBottomLeftRadius: style[1],
        };
        break;
      case "radiusTopLeft":
        acc = {
          ...acc,
          borderTopLeftRadius: style[1],
        };
        break;
      case "radiusTopRight":
        acc = {
          ...acc,
          borderTopRightRadius: style[1],
        };
        break;
      case "radiusBottomLeft":
        acc = {
          ...acc,
          borderBottomLeftRadius: style[1],
        };
        break;
      case "radiusBottomRight":
        acc = {
          ...acc,
          borderBottomRightRadius: style[1],
        };
        break;
      case "widthTop":
        acc = {
          ...acc,
          borderTopWidth: style[1],
        };
        break;
      case "widthRight":
        acc = {
          ...acc,
          borderRightWidth: style[1],
        };
        break;
      case "widthBottom":
        acc = {
          ...acc,
          borderBottomWidth: style[1],
        };
        break;
      case "widthLeft":
        acc = {
          ...acc,
          borderLeftWidth: style[1],
        };
        break;
      default:
        acc[`border${style[0].charAt(0).toUpperCase()}${style[0].slice(1)}`] = style[1];
    }
    return acc;
  }, {} as any);

export const effects: StyleFn<{
  boxShadow: string;
  outline: string;
  opacity: string;
  transition: string;
  cursor: string;
}> = (styles) => createObjectStyles(styles);

export const merge = (...styles: any[]) =>
  (styles || []).filter((s) => s).reduce((a, b) => Object.assign(a, b), {}) as any;
