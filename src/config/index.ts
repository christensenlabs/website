import type { Config } from "./types";
import devConfig from "./dev";
import prodConfig from "./prod";

export const config: Config = import.meta.env.DEV ? devConfig : prodConfig;
