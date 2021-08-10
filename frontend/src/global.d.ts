/* eslint no-underscore-dangle: 0 */
declare const __PATH_PREFIX__: string

interface CSSModule {
  [className: string]: string
}
declare module '*.svg' {
  const svgfile: string
  export default svgfile
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}
