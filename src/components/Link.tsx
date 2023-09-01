import { cn } from "@madx/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import NextLink from "next/link";

const DEFAULT_CLASSNAMES = cn("transition-colors duration-200");

const linkVariants = cva(DEFAULT_CLASSNAMES, {
  variants: {
    kind: {
      primary: "",
      accent: "",
      destructive: "",
    },
    shape: {
      default: "inline-block",
      button: "inline-block border border-transparent",
      outline: "inline-block border",
    },
    size: {
      default: "rounded px-3 py-2 font-medium before:rounded",
      small: "",
      large: "rounded-lg px-4 py-2 text-lg font-bold before:rounded-lg",
    },
  },
  compoundVariants: [
    {
      kind: "primary",
      shape: "button",
      className:
        "before:bg-radial-gradient-to-b relative border border-bronze-text-low bg-bronze-solid bg-gradient-to-b from-bronze-solid-hover to-bronze-solid text-bronze-surface transition-transform before:absolute before:inset-0 before:from-bronze-text-high before:to-bronze-solid before:opacity-0 before:mix-blend-overlay before:transition-all hover:before:opacity-100 active:scale-95",
    },
    {
      kind: "accent",
      shape: "button",
      className: "bg-sky-solid text-sky-surface hover:bg-sky-text-low",
    },
    {
      kind: "primary",
      shape: "outline",
      className:
        "border-bronze-solid text-bronze-text-low transition-transform hover:border-bronze-text-low hover:text-bronze-text-high active:scale-95",
    },
    {
      kind: "accent",
      shape: "outline",
      className:
        "border-sky-solid text-sky-text-low hover:border-sky-text-low hover:text-sky-text-high",
    },
  ],
  defaultVariants: {
    kind: "primary",
    shape: "default",
    size: "default",
  },
});

type NextLinkProps = typeof NextLink extends React.ForwardRefExoticComponent<
  infer T
>
  ? T
  : never;

type Props = NextLinkProps & VariantProps<typeof linkVariants>;

export default function Link({ kind, shape, size, ...props }: Props) {
  return (
    <NextLink className={cn(linkVariants({ kind, shape, size }))} {...props} />
  );
}
