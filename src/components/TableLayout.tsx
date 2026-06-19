import { Link } from "react-router-dom";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";

export interface ColumnType<T> {
  label: string;
  field: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

type ActionType<T> =
  | {
      type: "link";
      field: keyof T;
      baseUrl: string;
      addField?: keyof T;
      query?: string;
    }
  | {
      type: "action";
      icon?: React.ElementType;
      field: keyof T;
      label?: string;
      value?: (value: any) => any;
      callback: (row: T) => void;
    };

interface TableLayoutProps<T> {
  tableName: string;
  columns: ColumnType<T>[];
  data: T[];
  count: number;
  page: number;
  rowsPerPage: number;
  search: string;
  onFilter?: () => void;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  loading?: boolean;
  actions?: ActionType<T>[];
}

function TableLayout<T extends { _id: string }>({
  tableName,
  columns,
  data,
  count,
  page,
  onFilter,
  rowsPerPage,
  search,
  onSearchChange,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  actions,
}: TableLayoutProps<T>) {
  const getAction = (field: keyof T) =>
    actions?.filter((a) => a.field === field);

  return (
    <div className="w-full p-4">
      {/* HEADER */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {tableName}
        </h2>

        <div className="flex items-center gap-3">
          {loading && (
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${tableName}...`}
              className="w-64 rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {onFilter && (
            <button
              onClick={onFilter}
              className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-zinc-800"
              title="Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.field)}
                    className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr
                    key={row._id}
                    className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                  >
                    {columns.map((col) => {
                      const value = row[col.field];
                      const fieldActions = getAction(col.field);

                      return (
                        <td
                          key={String(col.field)}
                          className="px-4 py-3 text-zinc-700 dark:text-zinc-200"
                        >
                          {/* custom render */}
                          {col.render ? (
                            col.render(value, row)
                          ) : fieldActions?.length ? (
                            <div className="flex items-center gap-3">
                              {fieldActions.map((action, idx) => {
                                if (action.type === "link") {
                                  const to = `${action.baseUrl}/${
                                    action.addField
                                      ? row[action.addField]
                                      : value
                                  }${action.query ? action.query : ""}`;

                                  return (
                                    <Link
                                      key={idx}
                                      to={to}
                                      className="font-medium text-indigo-600 hover:underline"
                                    >
                                      {String(value)}
                                    </Link>
                                  );
                                }

                                if (action.type === "action") {
                                  const Icon = action.icon;

                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => action.callback(row)}
                                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-800"
                                    >
                                      {Icon && <Icon className="h-4 w-4" />}
                                      {action.label
                                        ? action.label === "NO_LABEL"
                                          ? ""
                                          : action.label
                                        : action.value
                                          ? action.value(value)
                                          : "Action"}
                                    </button>
                                  );
                                }

                                return null;
                              })}
                            </div>
                          ) : (
                            String(value)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
          <p className="text-sm text-zinc-500">Total: {count}</p>

          <div className="flex items-center gap-3">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40 dark:border-zinc-700"
              >
                Prev
              </button>

              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Page {page}
              </span>

              <button
                disabled={page * rowsPerPage >= count}
                onClick={() => onPageChange(page + 1)}
                className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40 dark:border-zinc-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableLayout;
