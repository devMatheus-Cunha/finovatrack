export type ITypeModal =
  | "edit"
  | "delete"
  | "addEntry"
  | "addExpense"
  | "totalsEntrys"
  | "";

export type Item = {
  description: string;
  real_value: number;
  euro_value: number;
  type: string;
  typeMoney: string;
  id?: string;
};

export type IFormData = {
  description: string;
  value: number;
  type: string;
  typeMoney: string;
};

const FixErroBuild = () => {
  return null;
};

export default FixErroBuild;
