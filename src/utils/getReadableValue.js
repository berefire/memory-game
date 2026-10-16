export function getReadableValue(value, theme) {
  if (theme !== "icons") return value;
  return value
    .replace(/^icon-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}