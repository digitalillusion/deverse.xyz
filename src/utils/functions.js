export const isSmallScreen = () => {
  let isSmallScreen = false
  if (typeof window !== "undefined") {
    isSmallScreen = window.matchMedia("(max-width: 800px)").matches
  }
  return isSmallScreen
}
