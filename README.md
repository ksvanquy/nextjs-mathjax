# NextJS MathJax

Modern MathJax 3 integration for Next.js 15+ with App Router support. Optimized for server-side rendering and client-side hydration.

## Features

- ✅ **MathJax 3 Support**: Latest MathJax version with modern API
- ✅ **Next.js 15+ Compatible**: Full support for App Router
- ✅ **SSR Safe**: No hydration errors with proper usage
- ✅ **TypeScript**: Full type safety
- ✅ **Lightweight**: Minimal bundle impact
- ✅ **Flexible**: Multiple rendering modes and configuration options

## Installation

```bash
npm install nextjs-mathjax
# or
yarn add nextjs-mathjax
# or
pnpm add nextjs-mathjax
```

## Quick Start

### For Next.js App Router (Recommended)

To avoid hydration errors, use dynamic imports:

```tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const MathJaxContext = dynamic(
  () => import('nextjs-mathjax').then(mod => mod.MathJaxContext),
  { ssr: false }
);

const MathJax = dynamic(
  () => import('nextjs-mathjax').then(mod => mod.MathJax),
  { ssr: false }
);

export default function MyComponent() {
  return (
    <MathJaxContext>
      <div>
        <h1>Math Examples</h1>
        <p>Inline math: <MathJax inline>{"\\(E = mc^2\\)"}</MathJax></p>
        <MathJax>{"\\(\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\)"}</MathJax>
      </div>
    </MathJaxContext>
  );
}
```

### For Pages Router or Direct Import

```tsx
import { MathJaxContext, MathJax } from 'nextjs-mathjax';

export default function MyComponent() {
  return (
    <MathJaxContext>
      <div>
        <h1>Math Examples</h1>
        <p>Inline math: <MathJax inline>{"\\(E = mc^2\\)"}</MathJax></p>
        <MathJax>{"\\(\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\)"}</MathJax>
      </div>
    </MathJaxContext>
  );
}
```

## Examples

### Inline Math

```tsx
<p>
  Einstein's famous equation: <MathJax inline>{"\\(E = mc^2\\)"}</MathJax> 
  represents mass-energy equivalence.
</p>
<p>
  The quadratic formula: <MathJax inline>{"\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)"}</MathJax> 
  solves quadratic equations.
</p>
```

### Display Math

```tsx
<MathJax>
  {"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}
</MathJax>

<MathJax>
  {"\\(\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\)"}
</MathJax>
```

### Complex Equations

```tsx
<MathJax>
  {"\\(\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\)"}
</MathJax>

<MathJax>
  {"\\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\)"}
</MathJax>
```

### Matrices

```tsx
<MathJax>
  {"\\(\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}\\)"}
</MathJax>
```

### Multiple Equations in One Component

```tsx
<MathJax>
  <div>
    <p>Pythagorean theorem: {"\\(x^2 + y^2 = z^2\\)"}</p>
    <p>Sum of first n integers: {"\\(\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\)"}</p>
    <p>Binomial theorem: {"\\((a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k\\)"}</p>
  </div>
</MathJax>
```

### Advanced Examples

```tsx
<MathJax>
  {"\\(\\begin{align*} \\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\epsilon_0} \\\\ \\nabla \\cdot \\vec{B} &= 0 \\\\ \\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\ \\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial \\vec{E}}{\\partial t} \\end{align*}\\)"}
</MathJax>
```

### With Dynamic Content

```tsx
<MathJax dynamic>
  {"\\(\\lim_{x \\to \\infty} \\frac{1}{x} = 0\\)"}
</MathJax>
```

### Custom Configuration

```tsx
<MathJaxContext 
  config={{
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
  }}
>
  <div>
    <p>Using dollar signs: <MathJax inline>{"$E = mc^2$"}</MathJax></p>
    <MathJax>{"$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$"}</MathJax>
  </div>
</MathJaxContext>
```

## API Reference

### MathJaxContext

The provider component that loads MathJax and provides it to child components.

```tsx
<MathJaxContext
  config={MathJax3Config}
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"
  asyncLoad={false}
  onLoad={() => console.log('MathJax loaded')}
  onError={(error) => console.error('MathJax error:', error)}
  onStartup={(mathJax) => console.log('MathJax started:', mathJax)}
  hideUntilTypeset="first"
  renderMode="post"
  typesettingOptions={{
    fn: "tex2chtml",
    options: { display: false }
  }}
>
  {children}
</MathJaxContext>
```

#### Props

- `config?: MathJax3Config` - MathJax configuration object
- `src?: string` - URL to MathJax script (default: CDN)
- `asyncLoad?: boolean` - Load script asynchronously (default: false)
- `onLoad?: () => void` - Callback when MathJax loads
- `onError?: (error: any) => void` - Error handler
- `onStartup?: (mathJax: MathJax3Object) => void` - Startup callback
- `hideUntilTypeset?: "first" | "every"` - Hide content until typeset
- `renderMode?: "pre" | "post"` - Rendering mode (default: "post")
- `typesettingOptions?: { fn: TypesettingFunction, options?: OptionList }` - Typesetting configuration

### MathJax

The component that renders mathematical expressions.

```tsx
<MathJax
  inline={false}
  dynamic={false}
  hideUntilTypeset="first"
  renderMode="post"
  typesettingOptions={{
    fn: "tex2chtml",
    options: { display: false }
  }}
  onInitTypeset={() => console.log('Initial typeset')}
  onTypeset={() => console.log('Typeset complete')}
  text="\\frac{1}{2}"
>
  {"\\(\\frac{1}{2}\\)"}
</MathJax>
```

#### Props

- `inline?: boolean` - Render as inline element (default: false)
- `dynamic?: boolean` - Enable dynamic updates (default: false in production)
- `hideUntilTypeset?: "first" | "every"` - Hide until typeset
- `renderMode?: "pre" | "post"` - Rendering mode
- `typesettingOptions?: { fn: TypesettingFunction, options?: OptionList }` - Typesetting config
- `onInitTypeset?: () => void` - Initial typeset callback
- `onTypeset?: () => void` - Typeset complete callback
- `text?: string` - Math text (required for renderMode="pre")
- `children?: ReactNode` - Math content

## Rendering Modes

### Post Mode (Default)

Render content first, then typeset:

```tsx
<MathJax>
  {"\\(\\frac{1}{2}\\)"}
</MathJax>
```

### Pre Mode

Typeset first, then render result:

```tsx
<MathJax 
  renderMode="pre" 
  text="\\frac{1}{2}"
  typesettingOptions={{ fn: "tex2chtml" }}
>
</MathJax>
```

## Configuration Examples

### Custom MathJax Config

```tsx
<MathJaxContext
  config={{
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    asciimath: {
      displaystyle: false
    }
  }}
>
  {/* Your content */}
</MathJaxContext>
```

### Local MathJax

```tsx
<MathJaxContext src="/mathjax/tex-mml-chtml.js">
  {/* Your content */}
</MathJaxContext>
```

### AsciiMath Support

```tsx
<MathJaxContext
  config={{
    loader: { load: ["input/asciimath"] }
  }}
>
  <MathJax>{"`frac(1)(2)`"}</MathJax>
</MathJaxContext>
```

## Advanced Usage

### Dynamic Content

```tsx
const [formula, setFormula] = useState("\\frac{1}{2}");

<MathJax dynamic>
  {`\\(${formula}\\)`}
</MathJax>
```

### Multiple Equations

```tsx
<MathJax>
  <div>
    <p>First: {"\\(x^2 + y^2 = z^2\\)"}</p>
    <p>Second: {"\\(\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\)"}</p>
  </div>
</MathJax>
```

### Custom Typesetting

```tsx
<MathJax
  typesettingOptions={{
    fn: "tex2svg",
    options: { display: true }
  }}
>
  {"\\(\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\)"}
</MathJax>
```

## Troubleshooting

### Hydration Errors

If you encounter hydration errors, ensure you're using dynamic imports:

```tsx
const MathJaxContext = dynamic(
  () => import('nextjs-mathjax').then(mod => mod.MathJaxContext),
  { ssr: false }
);
```

### MathJax Not Loading

Check that:
1. You're using `MathJaxContext` as a wrapper
2. The CDN URL is accessible
3. No network errors in browser console

### Types Not Working

Ensure you have TypeScript configured properly and import types:

```tsx
import type { MathJax3Config, MathJax3Object } from 'nextjs-mathjax';
```

## License

MIT

---
**Author:** Nguyễn Văn Quý

Contribute, report issues or suggestions at: https://github.com/ksvanquy/nextjs-mathjax

## Usage with Next.js App Router (with src directory)

This guide is for projects using **Next.js App Router** (with the `src` directory structure).

### 1. Install

```bash
npm install nextjs-mathjax
# or
yarn add nextjs-mathjax
```

---

### 2. Create a MathJax Client Component

Create the file: `src/components/MathJaxDemoClient.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: (HTMLElement | string)[]) => Promise<void>;
    };
  }
}

const MathJaxContext = dynamic(
  () => import("nextjs-mathjax").then((mod) => mod.MathJaxContext),
  { ssr: false }
);

export default function MathJaxDemoClient({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    function tryTypeset() {
      if (
        window.MathJax &&
        window.MathJax.typesetPromise &&
        containerRef.current
      ) {
        window.MathJax.typesetPromise([containerRef.current]);
      } else {
        timeout = setTimeout(tryTypeset, 100);
      }
    }
    tryTypeset();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [html]);

  return (
    <MathJaxContext
      config={{
        loader: {
          load: [
            "[tex]/ams",
            "[tex]/newcommand",
            "[tex]/require",
            "[tex]/mhchem",
            "[tex]/color",
            "[tex]/physics",
            "[tex]/boldsymbol",
            "[tex]/braket",
            "[tex]/bbox",
            "[tex]/html",
            "[tex]/upgreek",
            "[tex]/unicode",
            "[tex]/mathtools",
          ],
        },
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
          processEnvironments: true,
        },
        chtml: {
          displayAlign: "center",
          displayIndent: "0em",
        },
        svg: {
          fontCache: "global",
        },
      }}
    >
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </MathJaxContext>
  );
}
```

---

### 3. Use in your App Router page

Edit `src/app/page.tsx` (or any page in `src/app`):

```tsx
import MathJaxDemoClient from "../components/MathJaxDemoClient";

const mathHtml = `
  <div>
    <h2>Physics Example</h2>
    <p>Schrödinger equation: \\(i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi\\)</p>
    <h2>Chemistry Example</h2>
    <p>Chemical reaction: \\(\ce{2H2 + O2 -> 2H2O}\\)</p>
    <h2>Matrix</h2>
    <div>\\[\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\]</div>
    <h2>Advanced Math</h2>
    <div>\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]</div>
  </div>
`;

export default function HomePage() {
  return (
    <main>
      <h1>MathJax Demo</h1>
      <MathJaxDemoClient html={mathHtml} />
    </main>
  );
}
```

---

### 4. Notes

- Only use in Client Components (`"use client"`).
- Works with any HTML string containing LaTeX/MathJax expressions.
- Supports advanced math, physics, chemistry, color, matrix, etc. by loading the right MathJax extensions.