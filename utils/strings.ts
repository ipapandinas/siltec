export const removeURLSlash = (url: string) => {
  if (url.length === 0) return url;
  const lastChar = url.charAt(url.length - 1);
  if (lastChar === "/") {
    return url.slice(0, -1);
  } else {
    return url;
  }
};
