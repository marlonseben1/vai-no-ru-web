import AddIcon from '@mui/icons-material/Add';
import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { AccountMenu } from 'components/AccountMenu/AccountMenu';
import { ITENS_MENU } from 'layouts/PrivateLayout/PrivateLayout.static';
import { NavLink } from 'react-router';
import { paletaDeCores } from 'theme/paletaDeCores';
import { useNavBar } from './useNavBar';

const COR_DESTAQUE = paletaDeCores.turquesa[600];

export function NavBar() {
  const { handleReservar } = useNavBar();

  return (
    <Box
      component="header"
      sx={{
        flexShrink: 0,
        bgcolor: paletaDeCores.neutra[0],
        borderBottom: `1px solid ${paletaDeCores.cinza[400]}`,
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
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: paletaDeCores.turquesa[900],
          }}
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
                color: paletaDeCores.cinza[800],
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
            borderColor: paletaDeCores.cinza[700],
            color: paletaDeCores.cinza[950],
            bgcolor: paletaDeCores.neutra[0],
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': {
              bgcolor: paletaDeCores.turquesa[50],
              borderColor: paletaDeCores.cinza[700],
            },
          }}
        >
          Reservar
        </Button>
        <AccountMenu />
      </Box>
    </Box>
  );
}
