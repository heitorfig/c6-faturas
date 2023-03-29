import { FileOpenSharp } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import rawSaldo from './content/saldo.json';
import rawPagamentos from './content/pagamentos.json';
import rawMovimentos from './content/movimentos.json';
import logo from './logo.svg';
import { Pagamento } from './interfaces/FaturaItem';

const saldoRaw: number = rawSaldo.saldo;
const pagamentos: Pagamento[] = rawPagamentos;
const movimentos: number[] = rawMovimentos;

const Home = ({ setPage }: { setPage: (page: string) => void }) => {
  const sumAllPagamentosRaw = pagamentos.reduce((acc, pagamento) => acc + pagamento.value, 0);
  const sumAllMovimentosRaw = movimentos.reduce((acc, movimento) => acc + movimento, 0);
  const saldo = Math.abs(saldoRaw - sumAllPagamentosRaw - sumAllMovimentosRaw).toFixed(2).toString().replace('.', ',');

  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ paddingY: 3, minHeight: 90 }} alignItems="center" justifyContent="center">
        <Box flexGrow={1} sx={{ maxWidth: 100 }}>
          <img src={logo} alt="C6 Logo" style={{ display: 'block' }} />
        </Box>
      </Stack>
      <Stack spacing={2} sx={{ marginBottom: 2 }}>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="overline">Saldo:</Typography>
                <Typography variant="body1">Conta Corrente</Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold">R$ {saldo}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Stack spacing={2} sx={{ marginBottom: 2 }}>
        <Button color="warning" variant="outlined" onClick={() => setPage('faturas')} startIcon={<FileOpenSharp />}>
          Ver Faturas
        </Button>
      </Stack>
      <Alert severity="info">Este dispositivo não está autorizado. Por conta disso muitas ações estarão limitadas.</Alert>
    </Container>
  );
}

export default Home;
