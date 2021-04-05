import { Express } from "express";

export type LoaderArgs = {
  app: Express;
  config?: any;
  registerModules?: (args: any) => any;
};
