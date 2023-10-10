import { Checkbox } from '@/components/ui/checkbox';
import { IOrder } from '@/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '../DataTableColumnHeader';
import { DataTableRowActions } from '../DataTableRowActions';

export const orderColumns: ColumnDef<IOrder>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'ID'} />,
    // cell: ({ row }) => <UserCellHoverCard data={row.original} />,
  },
  {
    accessorKey: 'Order Code',
    accessorFn: row => row.code,
    header: 'Order Code',
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Phone'} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Status'} />,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Total'} />,
    cell: ({ getValue }) => <p className="font-semibold text-right">${`${getValue()}`}</p>,
  },
  {
    accessorKey: 'Placed Date',
    accessorFn: row => row.createdAt,
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Placed Date'} />,
    cell: ({ row }) => <span>{new Date(row.original.createdAt).toDateString()}</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'Delivered Date',
    accessorFn: row => row.deliveredAt,
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Delivery Date'} />,
    cell: ({ row }) => <span>{row.original.deliveredAt ? row.original.deliveredAt.toDateString() : 'TBD'}</span>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
