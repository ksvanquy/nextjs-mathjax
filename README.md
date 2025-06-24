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