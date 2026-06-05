import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl sm:text-3xl tracking-tight mt-12 mb-4 border-t hairline pt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl mt-8 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-ink-soft leading-relaxed my-4">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-terracotta underline underline-offset-2 hover:no-underline"
        target={href?.toString().startsWith("http") ? "_blank" : undefined}
        rel={href?.toString().startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-4 space-y-2 text-ink-soft">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 space-y-2 text-ink-soft">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-terracotta pl-6 my-8 font-display italic text-xl text-ink">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-rule/40 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-ink text-paper p-5 rounded my-6 overflow-x-auto text-sm">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-t hairline my-12" />,
    ...components,
  };
}
