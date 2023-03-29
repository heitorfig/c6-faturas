interface Installment {
  value: number;
  date: string;
}

export interface FaturaItem {
  description: string;
  count: boolean;
  notInflate?: boolean | undefined;
  installments: Installment[];
}

export interface Pagamento {
  value: number;
  date: string;
}
