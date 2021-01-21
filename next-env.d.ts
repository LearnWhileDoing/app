/// <reference types="next" />
/// <reference types="next/types/global" />

import "twin.macro";
import { CSSObject } from "@emotion/css";
import { DOMAttributes } from "react";

type CSSProp = CSSObject | string | CSS.Properties<any, string & {}>;

declare module "react" {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }

  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp;
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string;
      css?: CSSProp;
    }
  }
}
