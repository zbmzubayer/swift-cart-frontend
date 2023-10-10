import { orderStatuses, productStatuses, productWarranties, userGenders, userRoles } from './data';

export type FilterField = {
  column: string;
  title: string;
  options: { label: string; value: string }[];
};

export const userFilterFields: FilterField[] = [
  { column: 'role', title: 'Role', options: userRoles },
  { column: 'gender', title: 'Gender', options: userGenders },
];

export const productFilterFields: FilterField[] = [
  { column: 'status', title: 'Status', options: productStatuses },
  { column: 'warranty', title: 'Warranty', options: productWarranties },
];

export const orderFilterFields: FilterField[] = [{ column: 'status', title: 'Status', options: orderStatuses }];
