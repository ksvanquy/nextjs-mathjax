# nextjs-mathjax

![MathJax Examples](https://raw.githubusercontent.com/ksvanquy/nextjs-mathjax/main/examples/examples.png)

Modern MathJax 3 integration for Next.js 15+ with App Router support. Optimized for server-side rendering and client-side hydration.

## 🚀 Features
- Supports Next.js App Router (pages/app)
- Compatible with SSR and client-side hydration
- Easily render various formula types: inline, display, matrix, align, ...
- Built on MathJax 3 (modern, fast, and lightweight)
- TypeScript support

## 🛠️ Installation

```bash
npm install nextjs-mathjax
```

## ⚡️ Basic Usage

### 1. Wrap your app with `MathJaxProvider`

```tsx
import { MathJaxProvider, MathJax } from 'nextjs-mathjax';

export default function Page() {
  return (
    <MathJaxProvider>
      <div>
        <h1>MathJax Example</h1>
        <p>
          Inline: <MathJax inline>{'\\(a^2 + b^2 = c^2\\)'}</MathJax>
        </p>
        <MathJax>{'\\[E = mc^2\\]'}</MathJax>
      </div>
    </MathJaxProvider>
  );
}
```

### 2. Render different formula types

#### **Inline Math**
```tsx
<MathJax inline>{'\\(x = -b \\pm \\sqrt{b^2-4ac} / 2a\\)'}</MathJax>
```

#### **Display Math**
```tsx
<MathJax>{'\\[E = mc^2\\]'}</MathJax>
```

#### **Matrix**
```tsx
<MathJax>{'\\[\\begin{pmatrix} a & b \\ c & d \\end{pmatrix}\\]'}</MathJax>
```

#### **Align/Complex Equations**
```tsx
<MathJax>{'\\[\\begin{align*} a &= b + c \\ d &= e + f \\end{align*}\\]'}</MathJax>
```

#### **Sum, Integral, Fraction, Greek, ...**
```tsx
<MathJax>{'\\[\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\]'}</MathJax>
<MathJax>{'\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]'}</MathJax>
```

## ⚙️ Advanced Configuration

You can pass props to `MathJaxProvider` to customize MathJax 3 configuration:

```tsx
<MathJaxProvider config={{
  tex: { 
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
}}>
  ...
</MathJaxProvider>
```

## 📚 API Reference
### `MathJaxProvider` props:
- `config`: MathJax 3 configuration object
- `src`: Custom MathJax 3 CDN URL (optional)
- `asyncLoad`: Load MathJax asynchronously (default: false)
- `onStartup`: Callback when MathJax is ready
- `onLoad`: Callback when MathJax script is loaded
- `onError`: Error handler
- `children`: ReactNode

### `MathJax` props:
- `inline`: boolean (inline or display mode)
- `text`: string (formula content, if not using children)
- `children`: ReactNode (latex formula)
- `dynamic`: boolean (re-render on prop changes)
- `hideUntilTypeset`: "first" | "every" (hide content until typeset)
- `onInitTypeset`: Callback after first typeset
- `onTypeset`: Callback after each typeset

## 📝 License
MIT

---
**Author:** Nguyễn Văn Quý

Contribute, report issues or suggestions at: https://github.com/ksvanquy/nextjs-mathjax