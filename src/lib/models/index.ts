import { Singletons, keystatic } from "@madx/lib/keystatic";
import { Result } from "@swan-io/boxed";

export async function loadSingleton<KsType, SingletonType>(
  singletonName: keyof Singletons,
  hydrate: (item: KsType) => Promise<Result<SingletonType, string>>,
): Promise<Result<SingletonType, string>> {
  const item = await keystatic.singletons[singletonName].read();

  if (item === null) {
    return Result.Error(`${singletonName} is not created`);
  }

  return hydrate(item as KsType);
}

// export async function loadModel<KsType, ModelType>(
//   collectionName: keyof typeof keystatic.collections,
//   slug: string,
//   hydrate: (item: WithSlug<KsType>) => Promise<ModelType>,
// ): Promise<ModelType | null> {
//   const item = await keystatic.collections[collectionName].read(slug);
//
//   if (item === null) {
//     return null;
//   }
//
//   return hydrate({ slug, entry: item as KsType });
// }
//
// export async function loadCollection<KsType, ModelType>(
//   collectionName: keyof typeof keystatic.collections,
//   hydrate: (item: WithSlug<KsType>) => Promise<ModelType>,
// ): Promise<Array<ModelType>> {
//   const items = (await keystatic.collections[collectionName].all()) as Array<
//     WithSlug<KsType>
//   >;
//   return Promise.all(items.map(hydrate));
// }
