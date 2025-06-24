"use client"

import React from 'react'
import dynamic from 'next/dynamic'

const MathJaxContext = dynamic(
  () => import('nextjs-mathjax').then(mod => mod.MathJaxContext),
  { ssr: false }
)
const MathJax = dynamic(
  () => import('nextjs-mathjax').then(mod => mod.MathJax),
  { ssr: false }
)

export default function BasicUsage() {
  return (
    <MathJaxContext>
      <div>
        <h1>NextJS MathJax Examples</h1>
        
        <section>
          <h2>Inline Math</h2>
          <p>
            Einstein's famous equation: <MathJax inline>{"\\(E = mc^2\\)"}</MathJax> 
            represents mass-energy equivalence.
          </p>
          <p>
            The quadratic formula: <MathJax inline>{"\\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)"}</MathJax> 
            solves quadratic equations.
          </p>
        </section>
        
        <section>
          <h2>Display Math</h2>
          <MathJax>
            {"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}
          </MathJax>
          
          <MathJax>
            {"\\(\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\)"}
          </MathJax>
        </section>
        
        <section>
          <h2>Complex Equations</h2>
          <MathJax>
            {"\\(\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}\\)"}
          </MathJax>
          
          <MathJax>
            {"\\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\)"}
          </MathJax>
        </section>
        
        <section>
          <h2>Matrices</h2>
          <MathJax>
            {"\\(\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}\\)"}
          </MathJax>
        </section>
        
        <section>
          <h2>Multiple Equations in One Component</h2>
          <MathJax>
            <div>
              <p>Pythagorean theorem: {"\\(x^2 + y^2 = z^2\\)"}</p>
              <p>Sum of first n integers: {"\\(\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\)"}</p>
              <p>Binomial theorem: {"\\((a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k\\)"}</p>
            </div>
          </MathJax>
        </section>
        
        <section>
          <h2>Advanced Examples</h2>
          <MathJax>
            {"\\(\\begin{align*} \\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\epsilon_0} \\\\ \\nabla \\cdot \\vec{B} &= 0 \\\\ \\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\ \\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial \\vec{E}}{\\partial t} \\end{align*}\\)"}
          </MathJax>
        </section>
        
        <section>
          <h2>With Dynamic Content</h2>
          <MathJax dynamic>
            {"\\(\\lim_{x \\to \\infty} \\frac{1}{x} = 0\\)"}
          </MathJax>
        </section>
        
        <section>
          <h2>Custom Configuration</h2>
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
        </section>
        
        <footer>
          <p>NextJS MathJax - Modern MathJax 3 integration for Next.js</p>
        </footer>
      </div>
    </MathJaxContext>
  )
} 