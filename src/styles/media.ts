import { useMediaQuery } from "react-responsive";

enum Sizes {
  DESKTOP = "DESKTOP",
  MOBILE = "MOBILE",
}
const sizes = {
  [Sizes.DESKTOP]: 1000,
  [Sizes.MOBILE]: 700,
};

export const useIsMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: sizes[Sizes.MOBILE] });
  return { isMobile };
};
