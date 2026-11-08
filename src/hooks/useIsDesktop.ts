import { useMediaQuery } from '@mui/material';
import { desktopMediaQuery } from 'utils/isDesktop';

const useIsDesktop = () => useMediaQuery(desktopMediaQuery);

export default useIsDesktop;
