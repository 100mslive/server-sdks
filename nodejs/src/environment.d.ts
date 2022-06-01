declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HMS_ACCESS_KEY: string;
      HMS_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
