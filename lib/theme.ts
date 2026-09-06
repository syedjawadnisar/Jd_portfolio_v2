/**
 * Theme plumbing shared by the server layout and the client toggle.
 *
 * Light is the default, deliberately: the brief asks for bright and readable,
 * so an unset visitor gets light rather than whatever their OS happens to say.
 * Dark is an explicit, remembered choice.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Browser-chrome colour per theme. Must track --bg in app/globals.css. */
export const THEME_COLOR = { light: "#ffffff", dark: "#0b0d12" } as const;

/**
 * Runs blocking in <head>, before the first paint, so the correct theme is
 * already on <html> when the browser paints. Anything async here — including a
 * React effect — produces a visible flash of the wrong theme.
 *
 * It also repaints <meta name="theme-color">. That tag cannot key off
 * prefers-color-scheme here: the theme is class + localStorage driven and
 * defaults to light no matter what the OS says, so a media-query'd theme-color
 * would wrap dark browser chrome around a white page on any dark-mode phone.
 * Next emits the meta tag ahead of this script in <head>, so it is already
 * queryable by the time this runs.
 *
 * Minified by hand because it ships inline in every HTML file, and wrapped in
 * try/catch because localStorage throws outright in some privacy modes.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var d=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})==="dark";var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",d?${JSON.stringify(
  THEME_COLOR.dark,
)}:${JSON.stringify(THEME_COLOR.light)})}catch(e){}})();`;
