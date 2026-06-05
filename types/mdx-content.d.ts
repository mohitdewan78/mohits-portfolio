// Tells TypeScript that case-study MDX files export a typed `meta` constant
// in addition to the default React component.
declare module "@/content/work/*.mdx" {
  import type { ComponentType } from "react";
  import type { WorkMeta } from "@/lib/work";

  export const meta: WorkMeta;
  const Component: ComponentType;
  export default Component;
}
