import type { Users, Policies } from "../types/tables";
import Button from "./Button";

interface TableProps {
  className?: string;
  tableData: Users[] | Policies[];
  tableName: "Users" | "Policies";
}

// Helper function to get nested property values
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

interface HeaderConfig {
  display: string;
  dataKey?: string | string[]; // Can be a single key or an array for combined fields
  isAction?: boolean; // Flag for action column
}

function getHeaders(tableName: "Users" | "Policies"): HeaderConfig[] {
  if (tableName === "Users") {
    return [
      { display: "Id", dataKey: "id" },
      { display: "Name", dataKey: ["name.first", "name.last"] },
      { display: "Email", dataKey: "email" },
      { display: "Role", dataKey: "role" },
      { display: "Action", isAction: true },
    ];
  }

  return [
    { display: "Id", dataKey: "id" },
    { display: "Name", dataKey: ["name.first", "name.last"] },
    { display: "Plan", dataKey: "plan" },
    { display: "Status", dataKey: "status" },
    { display: "Effective Date", dataKey: "effective_date" },
    { display: "Action", isAction: true },
  ];
}

export default function Table(props: TableProps) {
  const headers = getHeaders(props.tableName);

  return (
    <table className={props.className}>
      <caption>{props.tableName}</caption>
      <colgroup>
        {headers.map((header, index) => (
          <col className={`${header.display.toLowerCase().replace(/\s/g, "-")}-col`} key={index} />
        ))}
      </colgroup>

      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header.display}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.tableData.map((row, rowIndex) => (
          <tr key={getNestedValue(row, "id") || rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>
                {header.isAction ? (
                  <>
                    <Button text="Edit" />
                    <Button text="Delete" />
                  </>
                ) : header.dataKey ? (
                  Array.isArray(header.dataKey) ? (
                    header.dataKey.map(key => getNestedValue(row, key)).join(" ")
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
