import Hero from "@madx/components/Hero";
import { loadSingleton } from "@madx/lib/models";
import { hydrateHero } from "@madx/lib/models/Hero";
import Image from "next/image";

const STACK = [
  {
    name: "TypeScript",
    image: "/images/logos/typescript.svg",
    description:
      "Although I'm comfortable in a bunch of others, TypeScript is my go-to language. Its ease of use combined with the safety it provides make it an ideal language for team work.",
  },
  {
    name: "Next.js",
    image: "/images/logos/nextjs.svg",
    description:
      "Building web-apps is made easier by using a great framework like Next.js. From static websites to full featured complex apps, Next can handle everything.",
  },
  {
    name: "React",
    image: "/images/logos/react.svg",
    description:
      "HTML is fine but adding a sprinkle of React magic on top of it makes reusability and composition a breeze. The vast and rapidly moving community is a source of innovation.",
  },
  {
    name: "PostgreSQL",
    image: "/images/logos/postgresql.svg",
    description:
      "What would be an app without a solid data layer? Postgre provides that, with an exceptional feature set and very good scalability.",
  },
  {
    name: "Neovim",
    image: "/images/logos/neovim.svg",
    description:
      "The modern take of an ancient editor that I've been using for more than a decade. Its simplicity, minimalism and keyboard-driven mindset are just right to me.",
  },
  {
    name: "GNOME",
    image: "/images/logos/gnome.svg",
    description:
      "I've been rocking Linux on all my computers for years and after having spent too much time configuring and building software, I've settled on the modern GNOME environment as my daily driver.",
  },
];

export default async function Home() {
  const heroData = await loadSingleton("hero", hydrateHero);

  if (!heroData.isOk()) {
    return <>No data</>;
  }

  return (
    <main>
      <Hero data={heroData.get()} />

      <section className="space-y-6 p-6 md:p-12">
        <h2 className="text-3xl font-black text-bronze-text-high">Stack</h2>
        <p className="max-w-screen-sm text-lg text-bronze-text-high">
          As with every craftmanship, building software requires a great set of
          tools. Over the years I had the opportunity to use quite a few. Here
          are the ones that currently stick out for me.
        </p>
        <ul className="grid justify-between gap-6 md:grid-cols-2">
          {STACK.map(({ description, image, name }) => (
            <li key={name} className="group">
              <figure className="flex flex-shrink-0 gap-4">
                <Image
                  className="max-h-12 w-12 object-contain opacity-80 transition-all duration-200 hover:opacity-100 md:max-h-24 md:w-24"
                  width={96}
                  height={96}
                  alt={name}
                  src={image}
                />
                <figcaption className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-bronze-text-high">
                    {name}
                  </h2>
                  <p className="text md:pl-4">{description}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
