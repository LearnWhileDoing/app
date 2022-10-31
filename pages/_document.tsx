import React from "react";

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

// noinspection JSUnusedGlobalSymbols
export default class Document extends NextDocument {
  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode persist when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
