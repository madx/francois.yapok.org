import { DocumentElement } from "@keystatic/core";
import { KsHero } from "@madx/lib/keystatic";
import { Result } from "@swan-io/boxed";

export type Hero = {
  catchphrase: string;
  position: string;
  companyLogo: string;
  companyName: string;
  companyUrl: string;
  blurb: DocumentElement[];
};

export async function hydrateHero(
  entry: KsHero,
): Promise<Result<Hero, string>> {
  if (!hasCompanyLogo(entry)) {
    return Result.Error("companyLogo is missing");
  }

  const blurb = await entry.blurb();

  return Result.Ok({
    ...entry,
    blurb,
  });
}

type HasCompanyLogo<T> = Omit<T, "companyLogo"> & { companyLogo: string };

function hasCompanyLogo(entry: KsHero): entry is HasCompanyLogo<KsHero> {
  return entry.companyLogo !== null;
}
