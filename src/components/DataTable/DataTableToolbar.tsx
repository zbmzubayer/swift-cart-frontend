import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { FilterField } from '@/constants/filterFields';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterFields?: FilterField[];
}

export function DataTableToolbar<TData>({ table, filterFields }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search users"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filterFields?.map(field => (
          <DataTableFacetedFilter
            key={field.column}
            column={table.getColumn(field.column)}
            title={field.title}
            options={field.options}
          />
        ))}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
