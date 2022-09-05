/* declare module '*.less' {
    const less: {[key: string]: string};
    export default less;
} */

declare module '*.module.less' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
