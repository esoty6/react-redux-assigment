import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { User } from '../../types/user.type';

export default function UserTable() {
  const defaultData: User[] = [
    {
      firstName: 'Hello',
      lastName: 'linsley',
      birthDate: '1973-01-22',
      email: 'johndoe@example.com',
    },
  ];

  const columnHelper = createColumnHelper<User>();

  const defaultColumns = [
    columnHelper.accessor('firstName', {
      cell: (info) => info.getValue(),
      header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
      cell: (info) => info.getValue(),
      header: 'Last Name',
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: 'Email',
    }),
    columnHelper.accessor('birthDate', {
      cell: (info) => info.getValue(),
      header: 'Birth Date',
    }),
  ];

  const [data] = useState(() => [...defaultData]);
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="overflow-x-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: clsx(
                          'resizer',
                          table.options.columnResizeDirection,
                          header.column.getIsResizing() && 'isResizing'
                        ),
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
