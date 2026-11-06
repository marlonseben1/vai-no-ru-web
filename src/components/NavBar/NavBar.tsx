import AddIcon from '@mui/icons-material/Add';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { AccountMenu } from 'components/AccountMenu/AccountMenu';
import { ITENS_MENU } from 'layouts/PrivateLayout/PrivateLayout.static';
import { NavLink } from 'react-router';
import { useNavBar } from './useNavBar';

const COR_DESTAQUE = '#3F706B';

export function NavBar() {
  const { handleReservar } = useNavBar();

  return (
    <Box
      component="header"
      sx={{
        flexShrink: 0,
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #DDE3E2',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          maxWidth: 1100,
          height: 64,
          mx: 'auto',
          px: 3,
        }}
      >
        <Typography
          component="div"
          noWrap
          sx={{ fontSize: 20, fontWeight: 700, color: '#1F3B38' }}
        >
          Vai no RU hoje?
        </Typography>

        <Box
          component="nav"
          aria-label="Principal"
          sx={{ display: 'flex', alignSelf: 'stretch', flex: 1, gap: 1 }}
        >
          {ITENS_MENU.map(({ texto, caminho, icone }) => (
            <ButtonBase
              key={caminho}
              component={NavLink}
              to={caminho}
              sx={{
                gap: 1,
                px: 2,
                fontSize: 15,
                fontWeight: 500,
                color: '#4A5453',
                borderBottom: '3px solid transparent',
                '& svg': { fontSize: 20 },
                '&.active': {
                  color: COR_DESTAQUE,
                  fontWeight: 700,
                  borderBottomColor: COR_DESTAQUE,
                },
              }}
            >
              {icone}
              {texto}
            </ButtonBase>
          ))}
        </Box>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleReservar}
          sx={{
            minHeight: 40,
            px: 2,
            borderRadius: '8px',
            borderColor: '#8A9493',
            color: '#1F2A2A',
            bgcolor: '#FFFFFF',
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { bgcolor: '#EAF0EF', borderColor: '#8A9493' },
          }}
        >
          Reservar
        </Button>
        <AccountMenu />
      </Box>
    </Box>
  );
}
