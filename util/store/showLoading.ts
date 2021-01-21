import constate from "constate";
import { useState } from "react";

export const [ShowWaitingProvider, useShowWaiting] = constate(() => useState(false));
