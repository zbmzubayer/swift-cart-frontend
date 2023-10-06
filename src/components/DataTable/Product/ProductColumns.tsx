import { Checkbox } from '@/components/ui/checkbox';
import { IProduct } from '@/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '../DataTableColumnHeader';
import { DataTableRowActions } from '../DataTableRowActions';
import ProductCellHoverCard from './ProductCellHoverCard';

export const productColumns: ColumnDef<IProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'ID'} />,
    cell: ({ row }) => <ProductCellHoverCard data={row.original} />,
  },
  {
    accessorKey: 'image',
    header: 'Picture',
    cell: props => (
      <img src={`${props.getValue()}`} alt="product picture" className="w-10 h-10 rounded-sm hover:scale-150" />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Name'} />,
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Company'} />,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Stock'} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Status'} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'warranty',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Warranty'} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'soldCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Sold Count'} />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Price'} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
