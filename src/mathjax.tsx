"use client"

import React, { ComponentPropsWithoutRef, FC, useContext, useEffect, useLayoutEffect, useRef } from "react"
import { MathJaxBaseContext } from "./context"
import type { MathJaxOverrideableProps, MathJax3Object } from "./types"

export interface MathJaxProps extends MathJaxOverrideableProps {
  inline?: boolean
  onInitTypeset?: () => void
  onTypeset?: () => void
  text?: string
  dynamic?: boolean
  children?: React.ReactNode
}

const typesettingFailed = (err: any) =>
  `Typesetting failed: ${typeof err.message !== "undefined" ? err.message : JSON.stringify(err)}`

const MathJax: FC<MathJaxProps & ComponentPropsWithoutRef<"span">> = ({
  inline = false,
  hideUntilTypeset,
  onInitTypeset,
  onTypeset,
  text,
  dynamic,
  typesettingOptions,
  renderMode,
  children,
  ...rest
}) => {

  const lastChildren = useRef<string>("")
  const ref = useRef<HTMLElement>(null)
  const mjPromise = useContext(MathJaxBaseContext)
  const usedHideUntilTypeset = hideUntilTypeset ?? mjPromise?.hideUntilTypeset
  const usedRenderMode = renderMode ?? mjPromise?.renderMode
  const usedConversionOptions = typesettingOptions ?? mjPromise?.typesettingOptions
  const usedDynamic = dynamic === false ? false : (dynamic || process.env.NODE_ENV !== "production")

  const initLoad = useRef(false)

  const typesetting = useRef(false)


  const checkInitLoad = () => {
    if (!initLoad.current) {
      if (usedHideUntilTypeset === "first" && ref.current !== null) {
        ref.current.style.visibility = "visible"
      }
      if (onInitTypeset) onInitTypeset()
      initLoad.current = true
    }
  }

  // callback for when typesetting is done
  const onTypesetDone = () => {
    if (usedHideUntilTypeset === "every" && usedDynamic && usedRenderMode === "post" && ref.current !== null) {
      ref.current.style.visibility = rest.style?.visibility ?? "visible"
    }
    checkInitLoad()
    if (onTypeset) onTypeset()
    typesetting.current = false
  }

  // validator for text input with renderMode = "pre"
  const validText = (inputText?: string) => typeof inputText === "string" && inputText.length > 0

  // guard which resets the visibility to hidden when hiding the content between every typesetting
  if (
    !typesetting.current &&
    ref.current !== null &&
    usedDynamic &&
    usedHideUntilTypeset === "every" &&
    usedRenderMode === "post"
  ) {
    ref.current.style.visibility = "hidden"
  }

  const effectToUse = typeof window !== "undefined" ? useLayoutEffect : useEffect
  effectToUse(() => {
    if (usedDynamic || !initLoad.current) {
      if (ref.current !== null) {
        if (mjPromise) {
          if (usedRenderMode === "pre") {
            if (!validText(text)) {
              throw Error(
                `Render mode 'pre' requires text prop to be set and non-empty, which was currently "${text}"`
              )
            }
            if (!typesettingOptions || !typesettingOptions.fn) {
              throw Error(
                "Render mode 'pre' requires 'typesettingOptions' prop with 'fn' property to be set on MathJax element or in the MathJaxContext"
              )
            }
          }
          if (usedRenderMode === "post" || text !== lastChildren.current) {
            if (!typesetting.current) {
              typesetting.current = true
              mjPromise.promise
                .then((mathJax: MathJax3Object) => {
                  if (usedRenderMode === "pre") {
                    if (typesettingOptions!.fn.endsWith("Promise")) {
                      mathJax.startup.promise
                        .then(() =>
                          mathJax[usedConversionOptions!.fn](text!, {
                            ...(usedConversionOptions?.options || {}),
                            display: !inline
                          })
                        )
                        .then((output: any) => {
                          if (typeof output === 'string') {
                            if (ref.current !== null) ref.current.innerHTML = output
                          } else if (output instanceof HTMLElement) {
                            mathJax.startup.document.clear()
                            mathJax.startup.document.updateDocument()
                            if (ref.current !== null) ref.current.innerHTML = output.outerHTML
                          }
                          onTypesetDone()
                        })
                        .catch((err: any) => {
                          onTypesetDone()
                          throw Error(typesettingFailed(err))
                        })
                    } else {
                      mathJax.startup.promise
                        .then(() => {
                          const output = mathJax[usedConversionOptions!.fn](text!, {
                            ...(usedConversionOptions?.options || {}),
                            display: !inline
                          })
                          if (typeof output === 'string') {
                            if (ref.current !== null) ref.current.innerHTML = output
                          } else if (output instanceof HTMLElement) {
                            mathJax.startup.document.clear()
                            mathJax.startup.document.updateDocument()
                            if (ref.current !== null) ref.current.innerHTML = output.outerHTML
                          }
                          onTypesetDone()
                        })
                        .catch((err: any) => {
                          onTypesetDone()
                          throw Error(typesettingFailed(err))
                        })
                    }
                  } else {
                    // renderMode "post"
                    mathJax.startup.promise
                      .then(() => {
                        if (ref.current) {
                          mathJax.typesetClear([ref.current])
                          return mathJax.typesetPromise([ref.current])
                        }
                        return Promise.resolve()
                      })
                      .then(onTypesetDone)
                      .catch((err: any) => {
                        onTypesetDone()
                        throw Error(typesettingFailed(err))
                      })
                  }
                })
                .catch((err: any) => {
                  onTypesetDone()
                  throw Error(typesettingFailed(err))
                })
            }
          }
        } else {
          throw Error(
            "MathJax was not loaded, did you use the MathJax component outside of a MathJaxContext?"
          )
        }
      }
    }
  })

  return (
    <span
      {...rest}
      style={{
        display: inline ? "inline" : "block",
        ...rest.style,
        visibility: usedHideUntilTypeset ? "hidden" : rest.style?.visibility
      }}
      ref={ref}
    >
      {children}
    </span>
  )
}

export default MathJax 