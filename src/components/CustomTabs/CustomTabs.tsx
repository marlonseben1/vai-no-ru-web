import { Box, Tab, Tabs } from '@mui/material';
import { type ReactNode, type SyntheticEvent, useState } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  children: ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  indiceInicial?: number;
}

export function CustomTabs({ tabs, indiceInicial = 0 }: CustomTabsProps) {
  const [value, setValue] = useState(indiceInicial);

  function handleChange(_event: SyntheticEvent, novoValor: number) {
    setValue(novoValor);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Dias da semana"
          variant="scrollable"
          scrollButtons={false}
          sx={{
            '& .MuiTabs-scroller': { overflowY: 'hidden' },
            '& .MuiTab-root': { flex: '1 0 auto', minWidth: 72, py: 1.5 },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          {value === index && (
            <Box sx={{ py: 3, px: { xs: 2, sm: 4 } }}>{tab.children}</Box>
          )}
        </div>
      ))}
    </Box>
  );
}
