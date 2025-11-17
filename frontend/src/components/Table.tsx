import clsx from "clsx";
import type { Employees, Policies } from "../types/tables";
import Button from "./Button";

interface TableProps {
  className?: string;
  tableData: Employees[] | Policies[];
  tableName: "Employees" | "Policies";
  onEditClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
  onViewPoliciesClick?: (index: number) => void;
}

// Helper function to get nested property values
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

interface HeaderConfig {
  display: string;
  dataKey?: string | string[]; // Can be a single key or an array for combined fields
  isAction?: boolean; // Flag for action column
}

function getHeaders(tableName: "Employees" | "Policies"): HeaderConfig[] {
  if (tableName === "Employees") {
    return [
      { display: "Id", dataKey: "id.id.String" },
      { display: "Name", dataKey: ["name.first_name", "name.last_name"] },
      { display: "Email", dataKey: "email" },
      { display: "Role", dataKey: "role" },
      { display: "Action", isAction: true },
    ];
  }

  return [
    { display: "Id", dataKey: "id.id.String" },
    { display: "Name", dataKey: ["name.first_name", "name.last_name"] },
    { display: "Plan", dataKey: "plan" },
    { display: "Status", dataKey: "status" },
    { display: "Effective Date", dataKey: "effective_date" },
    { display: "Action", isAction: true },
  ];
}

export default function Table(props: TableProps) {
  const headers = getHeaders(props.tableName);

  return (
    <table className={clsx(props.className, "w-[90svw] rounded-2xl text-foreground")}>
      <colgroup>
        {headers.map((header, index) => (
          <col
            className={`${header.display.toLowerCase().replace(/\s/g, "-")}-col`}
            key={index}
          />
        ))}
      </colgroup>

      <thead>
        <tr className="border-b bg-surface-800">
          {headers.map((header, index) => (
            <th key={index} className="text-left px-4 py-2">
              {header.display}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-foreground-muted">
        {props.tableData.map((row, rowIndex) => (
          <tr className="border-b" key={getNestedValue(row, "id") || rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className="px-4 py-2">
                {header.isAction ? (
                  <article className="flex gap-1">
                    <Button
                      text="Edit"
                      size="small"
                      onClick={() => props.onEditClick(rowIndex)}
                    />
                    {props.tableName === "Employees" && props.onViewPoliciesClick && (
                      <Button
                        text="View Policies"
                        size="small"
                        onClick={() => props.onViewPoliciesClick?.(rowIndex)}
                      />
                    )}
                    <Button
                      danger
                      text="Delete"
                      size="small"
                      onClick={() => props.onDeleteClick(rowIndex)}
                    />
                  </article>
                ) : header.dataKey ? (
                  Array.isArray(header.dataKey) ? (
                    header.dataKey
                      .map((key) => getNestedValue(row, key))
                      .join(" ")
                  ) : (
                    getNestedValue(row, header.dataKey)
                  )
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
