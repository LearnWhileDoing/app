import { createStandaloneToast, extendTheme } from "@chakra-ui/react";

import theme from "~/core/util/theme";

const toast = createStandaloneToast({ theme: extendTheme(theme), defaultOptions: { position: "bottom-right" } });

export default toast;
