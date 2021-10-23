declare module "namespaced-console-logger" {
  export type Logger = {
    info(...args: string[]): void;
    warn(...args: string[]): void;
    error(...args: string[]): void;
  };

  export type Loggers = {
    get(namespace: string): Logger;
  };

  export default function createLoggers(
    level: "info" | "warn" | "error",
    template: string,
    templateDefaults: { [key: string]: string | (() => string) }
  ): Loggers;
}

