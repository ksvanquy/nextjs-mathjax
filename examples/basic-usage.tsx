"use client"

import { MathJaxProvider, MathJax } from 'nextjs-mathjax'

export default function BasicExample() {
  return (
    <MathJaxProvider>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Next.js MathJax Examples</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Inline Math</h2>
          <p className="text-lg">
            The quadratic formula is: <MathJax inline>{"\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)"}</MathJax>
          </p>
          <p className="text-lg">
            Euler's identity: <MathJax inline>{"\\(e^{i\\pi} + 1 = 0\\)"}</MathJax>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Display Math</h2>
          <MathJax>
            {"\\[\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\]"}
          </MathJax>
          
          <MathJax>
            {"\\[\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\]"}
          </MathJax>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Complex Equations</h2>
          <MathJax>
            {"\\[\\begin{align*} \\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\epsilon_0} \\\\ \\nabla \\cdot \\vec{B} &= 0 \\\\ \\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\ \\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial \\vec{E}}{\\partial t} \\end{align*}\\]"}
          </MathJax>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Matrix</h2>
          <MathJax>
            {"\\[\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}\\]"}
          </MathJax>
        </section>
      </div>
    </MathJaxProvider>
  )
} 