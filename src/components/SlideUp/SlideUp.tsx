import { Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import type { ReactElement } from 'react';

export function SlideUp(props: TransitionProps & { children: ReactElement }) {
  return <Slide direction="up" {...props} />;
}
