"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { PullQuote } from "./PullQuote";

const components = {
  PullQuote,
  hr: () => <hr className="hr-sand my-12" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <PullQuote>{children}</PullQuote>
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div
      className="prose prose-lg prose-ma max-w-none
        prose-headings:font-display prose-headings:font-light
        prose-p:leading-relaxed prose-p:text-[var(--color-parchment-warm)]
        prose-strong:text-[var(--color-parchment)]
        prose-em:text-[var(--color-sand)]
        prose-a:text-[var(--color-sand)] prose-a:no-underline hover:prose-a:underline
        first:prose-p:drop-cap"
    >
      <MDXRemote {...source} components={components} />
    </div>
  );
}
