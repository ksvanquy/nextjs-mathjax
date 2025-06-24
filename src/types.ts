// MathJax 3 types
export interface MathJax3Object {
  startup: {
    promise: Promise<void>
    document: {
      clear(): void
      updateDocument(): void
    }
  }
  typesetClear(elements: HTMLElement[]): void
  typesetPromise(elements: HTMLElement[]): Promise<void>
  tex2chtml(text: string, options?: any): HTMLElement
  tex2chtmlPromise(text: string, options?: any): Promise<HTMLElement>
  tex2svg(text: string, options?: any): HTMLElement
  tex2svgPromise(text: string, options?: any): Promise<HTMLElement>
  tex2mml(text: string, options?: any): string
  tex2mmlPromise(text: string, options?: any): Promise<string>
  mathml2chtml(text: string, options?: any): HTMLElement
  mathml2chtmlPromise(text: string, options?: any): Promise<HTMLElement>
  mathml2svg(text: string, options?: any): HTMLElement
  mathml2svgPromise(text: string, options?: any): Promise<HTMLElement>
  mathml2mml(text: string, options?: any): string
  mathml2mmlPromise(text: string, options?: any): Promise<string>
  asciimath2chtml(text: string, options?: any): HTMLElement
  asciimath2chtmlPromise(text: string, options?: any): Promise<HTMLElement>
  asciimath2svg(text: string, options?: any): HTMLElement
  asciimath2svgPromise(text: string, options?: any): Promise<HTMLElement>
  asciimath2mml(text: string, options?: any): string
  asciimath2mmlPromise(text: string, options?: any): Promise<string>
  [key: string]: any
}

export interface MathJax3Config {
  loader?: {
    load?: string[]
  }
  tex?: {
    inlineMath?: string[][]
    displayMath?: string[][]
    processEscapes?: boolean
    processEnvironments?: boolean
  }
  asciimath?: {
    displaystyle?: boolean
  }
  svg?: {
    fontCache?: string
  }
  chtml?: {
    displayAlign?: string
    displayIndent?: string
  }
}

// Common types
export interface OptionList {
  display?: boolean
  [key: string]: any
}

export type TypesettingFunction =
  | "tex2chtml"
  | "tex2chtmlPromise"
  | "tex2svg"
  | "tex2svgPromise"
  | "tex2mml"
  | "tex2mmlPromise"
  | "mathml2chtml"
  | "mathml2chtmlPromise"
  | "mathml2svg"
  | "mathml2svgPromise"
  | "mathml2mml"
  | "mathml2mmlPromise"
  | "asciimath2chtml"
  | "asciimath2chtmlPromise"
  | "asciimath2svg"
  | "asciimath2svgPromise"
  | "asciimath2mml"
  | "asciimath2mmlPromise"

export type MathJaxOverrideableProps = {
  hideUntilTypeset?: "first" | "every"
  typesettingOptions?: {
    fn: TypesettingFunction
    options?: Omit<OptionList, "display">
  }
  renderMode?: "pre" | "post"
}

export type MathJaxSubscriberProps = {
  version: 3
  promise: Promise<MathJax3Object>
} & MathJaxOverrideableProps

export type MathJaxContextStaticProps = MathJaxOverrideableProps & {
  src?: string
  asyncLoad?: boolean
  onLoad?: () => void
  onError?: (error: any) => void
  children?: React.ReactNode
}

export type MathJaxContextProps = {
  config?: MathJax3Config
  version?: 3
  onStartup?: (mathJax: MathJax3Object) => void
} & MathJaxContextStaticProps 