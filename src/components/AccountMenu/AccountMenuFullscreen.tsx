import ChevronRight from '@mui/icons-material/ChevronRight';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from '@mui/material';
import { colorPalette, FONT_FAMILY_LAYOUT } from 'theme/colorPalette';

interface AccountMenuFullscreenProps {
  open: boolean;
  nome?: string;
  inicial?: string;
  saindo: boolean;
  offsetInferior: number;
  onClose: () => void;
  onSair: () => void;
}

export function AccountMenuFullscreen({
  open,
  nome,
  inicial,
  saindo,
  offsetInferior,
  onClose,
  onSair,
}: AccountMenuFullscreenProps) {
  const itens = [
    { texto: 'Configurações', icone: <Settings />, onClick: onClose },
    { texto: 'Sair', icone: <Logout />, onClick: onSair, desabilitado: saindo },
  ];

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        id="account-menu"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: offsetInferior,
          zIndex: (theme) => theme.zIndex.appBar + 1,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          fontFamily: FONT_FAMILY_LAYOUT,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: 70,
            px: 3,
            borderRadius: '0 0 8px 8px',
            bgcolor: colorPalette.primary[800],
            color: '#FFF',
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#FFF',
              color: colorPalette.primary[800],
            }}
          >
            {inicial}
          </Avatar>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ fontFamily: 'inherit', fontWeight: 'bold' }}
          >
            {nome}
          </Typography>
        </Box>

        <List component="nav">
          {itens.map(({ texto, icone, onClick, desabilitado }, indice) => (
            <ListItem
              key={texto}
              disablePadding
              sx={{
                px: 2,
                borderBottom:
                  indice < itens.length - 1
                    ? `1px solid ${colorPalette.neutral[200]}`
                    : undefined,
              }}
            >
              <ListItemButton
                onClick={onClick}
                disabled={desabilitado}
                sx={{ py: 1.5, px: 0 }}
              >
                <ListItemIcon
                  sx={{ minWidth: 40, color: colorPalette.primary[800] }}
                >
                  {icone}
                </ListItemIcon>
                <ListItemText
                  primary={texto}
                  slotProps={{ primary: { sx: { fontFamily: 'inherit' } } }}
                />
                <ChevronRight sx={{ color: colorPalette.primary[800] }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Slide>
  );
}
