import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, Stack, Typography, Chip, Box, Divider } from "@mui/material";
import { FaturaItem } from "../interfaces/FaturaItem";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

interface FaturaProps {
  date: string;
  label: string;
  items: FaturaItem[];
}

export const Fatura = ({ date, label, items }: FaturaProps): React.ReactElement => {
  const sumFatura = items.reduce((acc, item) => {
    const installment = item.installments.find(installment => installment.date === date);
    if (installment) {
      return acc + installment.value;
    }
    return acc;
  }, 0).toFixed(2).toString().replace('.', ',');

  return (
    <Accordion key={date}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
          <Box>
            <Typography variant="body1" component="div">{label}</Typography>
            <Typography variant="body2" component="div" sx={{ opacity: 0.5 }}>Vencimento: 10 de {label}</Typography>
          </Box>
          <Chip label={`R$ ${sumFatura}`} color="warning" sx={{ fontWeight: '700', marginLeft: 'auto' }} />
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
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
