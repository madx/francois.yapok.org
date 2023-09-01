import { Entry, createReader } from "@keystatic/core/reader";
import {
  default as config,
  default as keystaticConfig,
} from "keystatic.config";

export const keystatic = createReader(process.cwd(), config);

export type Singletons = (typeof keystaticConfig)["singletons"];
export type Singleton<T extends keyof Singletons> = Entry<Singletons[T]>;
// type Collections = (typeof keystaticConfig)["collections"];
// type Collection<T extends keyof Collections> = Entry<Collections[T]>;

export type KsHero = Singleton<"hero">;

export type WithSlug<T> = {
  slug: string;
  entry: T;
};
