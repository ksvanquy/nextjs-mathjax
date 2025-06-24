"use client"

import { createContext, useContext, useRef, ReactNode } from "react"
import type { 
  MathJax3Config, 
  MathJax3Object, 
  MathJaxSubscriberProps,
  MathJaxOverrideableProps 
} from "./types"

const DEFAULT_V3_SRC = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js"

let v3Promise: Promise<MathJax3Object>

export const MathJaxContext = createContext<MathJaxSubscriberProps | undefined>(undefined)

interface MathJaxContextStaticProps extends MathJaxOverrideableProps {
  src?: string
  asyncLoad?: boolean
  onLoad?: () => void
  onError?: (error: any) => void
  children?: ReactNode
}

export type MathJaxContextProps = {
  config?: MathJax3Config
  onStartup?: (mathJax: MathJax3Object) => void
} & MathJaxContextStaticProps

export function MathJaxProvider({
  config,
  src = DEFAULT_V3_SRC,
  onStartup,
  onLoad,
  asyncLoad = false,
  onError,
  typesettingOptions,
  renderMode = "post",
  hideUntilTypeset,
  children
}: MathJaxContextProps) {
  const previousContext = useContext(MathJaxContext)
  
  if (typeof previousContext !== "undefined") {
    throw Error(
      "Cannot nest MathJaxContexts. MathJaxContexts should not be nested at all. " +
      "Use only one MathJaxContext in your app."
    )
  }

  const mjContext = useRef<MathJaxSubscriberProps | undefined>(previousContext)

  function scriptInjector<T>(res: (mathJax: T) => void, rej: (error: any) => void) {
    if (config) (window as any).MathJax = config
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = src
    script.async = asyncLoad

    script.addEventListener("load", () => {
      const mathJax = (window as any).MathJax
      if (onStartup) onStartup(mathJax)
      res(mathJax)
      if (onLoad) onLoad()
    })
    script.addEventListener("error", (e) => rej(e))

    document.getElementsByTagName("head")[0].appendChild(script)
  }

  if (typeof mjContext.current === "undefined") {
    const baseContext = {
      typesettingOptions,
      renderMode,
      hideUntilTypeset
    }
    
    if (typeof v3Promise === "undefined") {
      if (typeof window !== "undefined") {
        v3Promise = new Promise<MathJax3Object>(scriptInjector)
        v3Promise.catch((e) => {
          if (onError) onError(e)
          else throw Error(`Failed to download MathJax from '${src}' due to: ${e}`)
        })
      } else {
        // for server side rendering
        v3Promise = Promise.reject()
        v3Promise.catch((_) => undefined)
      }
    }
    
    mjContext.current = {
      ...baseContext,
      version: 3,
      promise: v3Promise
    }
  }

  return (
    <MathJaxContext.Provider value={mjContext.current}>
      {children}
    </MathJaxContext.Provider>
  )
}

export function useMathJax() {
  const context = useContext(MathJaxContext)
  if (!context) {
    throw new Error("useMathJax must be used within a MathJaxProvider")
  }
  return context
} 