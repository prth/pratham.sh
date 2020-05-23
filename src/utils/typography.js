import Typography from "typography"
import gray from "gray-percentage"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

// using config from `typography-theme-wordpress-2016` as base
const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [
    {
      name: "Rubik",
      styles: ["400", "400i", "500", "500i", "700", "700i"],
    },
  ],
  headerFontFamily: [
    "Rubik",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  bodyFontFamily: [
    "Rubik",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  bodyColor: "hsla(0,0%,0%,0.9)",
  headerWeight: 500,
  bodyWeight: 400,
  boldWeight: 500,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    h1: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: "italic",
      paddingLeft: rhythm(13 / 16),
      marginLeft: rhythm(-1),
      borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
    },
    "blockquote > :last-child": {
      marginBottom: 0,
    },
    "blockquote cite": {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    "blockquote cite:before": {
      content: '"— "',
    },
    ul: {
      listStyle: "disc",
    },
    "ul,ol": {
      marginLeft: rhythm(1),
    },
    [MOBILE_MEDIA_QUERY]: {
      "ul,ol": {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    "h1,h2,h3,h4,h5,h6": {
      marginTop: rhythm(2),
    },
    h4: {
      letterSpacing: "0.140625em",
      textTransform: "uppercase",
    },
    h6: {
      fontStyle: "italic",
    },
    a: {
      boxShadow: "0 1px 0 0 currentColor",
      color: "#007acc",
      textDecoration: "none",
    },
    "a:hover,a:active": {
      boxShadow: "none",
    },
    "mark,ins": {
      background: "#007acc",
      color: "white",
      padding: `${rhythm(1 / 16)} ${rhythm(1 / 8)}`,
      textDecoration: "none",
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
