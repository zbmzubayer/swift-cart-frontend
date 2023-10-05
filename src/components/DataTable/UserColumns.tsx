import { Checkbox } from '@/components/ui/checkbox';
import { IUser } from '@/interfaces';
import { AvatarIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from './DataTableColumnHeader';
import { DataTableRowActions } from './DataTableRowActions';

export const columns: ColumnDef<IUser>[] = [
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
  },
  {
    accessorKey: 'image',
    header: 'Avatar',
    cell: info =>
      info.getValue() ? (
        <img src={`${info.getValue()}`} alt="avatar" className="w-10 h-10 rounded-full hover:scale-150" />
      ) : (
        <AvatarIcon className="w-10 h-10" />
      ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Name'} />,
  },

  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Email'} />,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Role'} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Gender'} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
