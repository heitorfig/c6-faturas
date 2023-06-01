import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, Stack, Typography, Chip, Box, Divider } from "@mui/material";
import { FaturaItem, Pagamento } from "../interfaces/FaturaItem";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

interface FaturaProps {
  date: string;
  label: string;
  items: FaturaItem[];
  pagamentos: Pagamento[];
}

export const Fatura = ({ date, label, items, pagamentos }: FaturaProps): React.ReactElement => {
  const sumFaturaRaw = items.reduce((acc, item) => {
    const installment = item.installments.find(installment => installment.date === date);
    if (installment) {
      return acc + installment.value;
    }
    return acc;
  }, 0);

  const sumPagamentosRaw = pagamentos.reduce((acc, pagamento) => {
    if (pagamento.date === date) {
      return acc + pagamento.value;
    }
    return acc;
  }, 0);

  const totalRaw = sumFaturaRaw - sumPagamentosRaw;
  const total = Math.abs(totalRaw).toFixed(2).toString().replace('.', ',');

  const status = Math.round(totalRaw) > 0 ? 'warning' : 'success';

  return (
    <Accordion key={date}>
      <AccordionSummary expandIcon={status === 'success' ? null : <ExpandMoreIcon />} disabled={status === 'success'}>
        <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
          <Box>
            <Typography variant="body1" component="div">{label}</Typography>
            <Typography variant="body2" component="div" sx={{ opacity: 0.5 }}>Vencimento: 10 de {label}</Typography>
          </Box>
          <Chip label={`R$ ${total}`} color={status} sx={{ fontWeight: '700', marginLeft: 'auto' }} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map(item => {
            const installment = item.installments.find(installment => installment.date === date);
            if (installment) {
              return (
                <React.Fragment key={`${date}-${item.description}`}>
                  <ListItem>
                    <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                      <Typography variant="body2" component="div">{item.description}</Typography>
                      <Typography variant="body1" component="div" fontWeight="bold">R$ {installment.value.toFixed(2).toString().replace('.', ',')}</Typography>
                    </Stack>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            }
            return null;
          })}
          {pagamentos.map(pagamento => {
            if (pagamento.date === date) {
              return (
                <React.Fragment key={`${date}-${pagamento.value}`}>
                  <ListItem>
                    <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
                      <Typography variant="body2" component="div">Pagamento</Typography>
                      <Typography variant="body1" component="div" fontWeight="bold">R$ {pagamento.value.toFixed(2).toString().replace('.', ',')}</Typography>
                    </Stack>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            }
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
