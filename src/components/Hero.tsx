import { DocumentRenderer } from "@keystatic/core/renderer";
import Link from "@madx/components/Link";
import { Hero } from "@madx/lib/models/Hero";
import { cn } from "@madx/lib/utils";
import Image from "next/image";

type Props = {
  data: Hero;
};

export default function Hero({ data }: Props) {
  return (
    <header className="Hero md:mt-32">
      <hr
        className={cn(
          "pulser relative top-px h-px w-full overflow-visible border-none bg-gradient-to-r from-bronze-2 via-bronze-9 to-bronze-2",
          "after:block after:h-px after:w-8 after:animate-pulser after:bg-gradient-to-r after:from-transparent after:via-bronze-12 after:to-transparent after:mix-blend-lighten",
          "before:absolute before:-top-2 before:block before:h-4 before:w-8 before:animate-pulser before:bg-sky-a8 before:blur-lg",
        )}
      />
      <div className="hero--inner bg-bronze-surface/20 relative flex flex-wrap gap-x-8 p-6 md:flex-nowrap md:p-12">
        <div className="order-2 space-y-6 text-center text-bronze-alpha-text-high md:pt-8 md:text-left">
          <div className="space-y-2">
            <h1 className="flex-1 text-3xl font-black md:text-4xl">
              {data.catchphrase}
            </h1>
            <h2 className="flex-1 text-xl font-normal text-bronze-alpha-text-low">
              {data.position} at{" "}
              <Link
                href={data.companyUrl}
                className="group inline-flex items-baseline gap-1 transition-all duration-200  hover:text-bronze-text-high"
              >
                <Image
                  className="opacity-60 sepia duration-200 group-hover:opacity-100"
                  src={data.companyLogo || ""}
                  width={18}
                  height={18}
                  alt=""
                />
                <strong>{data.companyName}</strong>
              </Link>
            </h2>
          </div>

          <div className="space-y-2 text-xl font-normal leading-relaxed">
            <DocumentRenderer document={data.blurb} />
          </div>

          <div className="flex items-center justify-center gap-4 md:justify-start">
            <Link
              shape="button"
              size="large"
              href="/api/contact"
              rel="noopener noreferrer"
            >
              Get in touch
            </Link>
            <Link
              shape="outline"
              size="large"
              href="https://www.linkedin.com/in/francoisvaux/"
            >
              Resumé
            </Link>
          </div>
        </div>
        <div className="order-1 flex flex-shrink-0 flex-grow justify-center md:order-3">
          <Image
            src="/images/francois.png"
            className="h-32 w-32 md:h-56 md:w-56"
            width={300}
            height={300}
            alt=""
          />
        </div>
      </div>
    </header>
  );
}
