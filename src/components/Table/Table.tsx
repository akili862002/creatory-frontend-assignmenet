"use client";

import React, {
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from "react";
import { Column, useTable } from "react-table";
import { cn } from "../../utils/classnames.utils";
import { Spinner } from "../Spinner/Spinner";

export interface ITableProps<T extends object> {
  className?: string;
  columns: Column<T>[];
  data: T[];
}

export interface ITableRef {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const TableInner = <T extends object>(
  { className, columns, data }: ITableProps<T>,
  ref: ForwardedRef<ITableRef>
) => {
  const [loading, setLoading] = useState(false);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  useImperativeHandle(ref, () => ({
    setLoading,
  }));

  return (
    <div
      className={cn(
        "relative overflow-x-auto rounded-lg",
        loading && "min-h-[300px] pointer-events-none select-none ",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 z-10 w-full h-full text-black bg-white bg-opacity-50 center-children">
          <Spinner size={50} />
        </div>
      )}
      <table
        {...getTableProps()}
        className={cn("font-light divide-y table-auto text-md", className)}
      >
        <thead className="overflow-hidden text-sm">
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="font-semibold text-gray-500 "
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  scope="col"
                  className="px-3 py-2 text-left"
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.maxWidth,
                    },
                  })}
                >
                  <div>{column.render("Header")}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-sm font-medium text-gray-500"
        >
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="relative border-b border-l-4 last:border-b-0 border-l-transparent"
              >
                {row.cells.map((cell, index) => (
                  <td {...cell.getCellProps()} className="px-2 py-2">
                    <div>{cell.render("Cell")}</div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const Table = forwardRef(TableInner) as <T extends object>(
  props: ITableProps<T> & {
    ref?: ForwardedRef<ITableRef>;
  }
) => JSX.Element;
