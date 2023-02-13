export const isSmallScreen = () => {
  let isSmallScreen = false
  if (typeof window !== "undefined") {
    isSmallScreen = window.matchMedia("(max-width: 900px)").matches
  }
  return isSmallScreen
}
