import className from "classnames";
import { twMerge } from "tailwind-merge";

export const cn = (...args: any[]) => {
  return className(args);
};

export const cnx = (...args: any[]) => {
  return twMerge(cn(args));
};
