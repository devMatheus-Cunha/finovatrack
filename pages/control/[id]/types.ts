export type ITypeModal =
  | 'edit'
  | 'delete'
  | 'addEntry'
  | 'addExpense'
  | 'totalsEntrys'
  | 'deleteAllExpenses'
  | '';

export type Item = {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
  id?: string;
};
