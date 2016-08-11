// Global variables
declare var ENV: string;
declare var HMR: boolean;
declare var IS_DEV: boolean;
declare var IS_PROD: boolean;
declare var IS_TEST: boolean;
interface GlobalEnvironment {
  ENV;
  HMR;
  IS_DEV;
  IS_PROD;
  IS_TEST;
}
interface Global extends GlobalEnvironment  {}

// Development enable long stacktraces
interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}
interface ErrorConstructor extends ErrorStackTraceLimit {}

// Missing module and require declaration
declare var module: { id: string };
declare var require: any;