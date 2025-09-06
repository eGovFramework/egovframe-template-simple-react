import { setupWorker } from "msw/browser";
import { handlers } from "./login/loginHandlers";

export const worker = setupWorker(...handlers);
