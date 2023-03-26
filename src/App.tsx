import { Box, Container, Stack, Typography } from '@mui/material';
import { Fatura } from './component/Fatura';
import rawItems from './content/items.json';
import { FaturaItem } from './interfaces/FaturaItem';
import logo from './logo.svg';

const items: FaturaItem[] = rawItems.filter(item => item.count).map(item => {
  if (item.notInflate) {
    return item;
  }
  item.installments = item.installments.map(installment => {
    installment.value = installment.value * 1.2;
    return installment;
  });
  return item;
});

const dates = [
  { date: '2023-04-01', label: 'Abril 2023' },
  { date: '2023-05-01', label: 'Maio 2023' },
  { date: '2023-06-01', label: 'Junho 2023' },
  { date: '2023-07-01', label: 'Julho 2023' },
  { date: '2023-08-01', label: 'Agosto 2023' },
  { date: '2023-09-01', label: 'Setembro 2023' },
  { date: '2023-10-01', label: 'Outubro 2023' },
  { date: '2023-11-01', label: 'Novembro 2023' },
  { date: '2023-12-01', label: 'Dezembro 2023' },
  { date: '2024-01-01', label: 'Janeiro 2024' },
  { date: '2024-02-01', label: 'Fevereiro 2024' },
  { date: '2024-03-01', label: 'Março 2024' },
  { date: '2024-04-01', label: 'Abril 2024' }
]

const App = () => {
  const sumAll = items.reduce((acc, item) => {
    const installment = item.installments.reduce((acc, installment) => acc + installment.value, 0);
    return acc + installment;
  }, 0).toFixed(2).toString().replace('.', ',');

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ paddingY: 3 }} alignItems="center">
        <Box flexGrow={1} sx={{ maxWidth: 100 }}>
          <img src={logo} alt="C6 Logo" style={{ display: 'block' }} />
        </Box>
        <Typography variant="body1">Consolidação de Faturas</Typography>
      </Stack>
      {dates.map(({ date, label }) => (
        <Fatura key={date} date={date} label={label} items={items} />
      ))}
      <Stack direction="row" justifyContent="space-between" sx={{ paddingY: 3 }} alignItems="center">
        <Typography variant="body1">Total em Aberto:</Typography>
        <Typography variant="body1" fontWeight="bold">R$ {sumAll}</Typography>
      </Stack>
    </Container>
  );
}

export default App;
