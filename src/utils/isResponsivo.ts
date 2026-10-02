import { MOBILE_BREAKPOINT } from 'shared/breakpoints';

export const responsiveMediaQuery = `(max-width: ${MOBILE_BREAKPOINT.width_px}) and (max-height: ${MOBILE_BREAKPOINT.height_px})`;

export const isResponsivo = () =>
  window.matchMedia(responsiveMediaQuery).matches;
