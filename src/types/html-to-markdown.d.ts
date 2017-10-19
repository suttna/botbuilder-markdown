/* tslint:disable */

// Type definitions for html-to-markdown 1.0.0
// Project: https://github.com/thetutlage/html-to-markdown
// Definitions by: bilby91 <https://github.com/bilby91>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.5.2

declare module 'html-to-markdown' {
  export function convert(text: string): string
  export function use(formatter: (html: string) => string): void
}
