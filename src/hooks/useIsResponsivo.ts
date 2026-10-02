import { useMediaQuery } from '@mui/material';
import { responsiveMediaQuery } from 'utils/isResponsivo';

const useIsResponsivo = () => useMediaQuery(responsiveMediaQuery);

export default useIsResponsivo;
