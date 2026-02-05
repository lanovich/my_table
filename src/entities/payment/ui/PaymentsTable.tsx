import { Column } from "@/widgets/Table/model";
import { Table } from "@/widgets/Table/ui";
import { Payment } from "../model";
import { StatusBadge } from "@/shared/ui";

interface Props {
  rows: Payment[];
}

export const PaymentsTable = ({ rows }: Props) => {
  const columns: Column<Payment>[] = [
    { key: "name", label: "Имя" },
    {
      key: "email",
      label: "Email",
      sort: (row) => row.email.toLowerCase(),
    },
    {
      key: "balance",
      label: "Баланс",
      align: "right",
      sort: (row) => parseFloat(row.balance.replace(/[$,]/g, "")),
      renderCell: (row) => (
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {row.balance}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Статус",
      align: "center",
      renderCell: (row) => (
        <StatusBadge
          isActive={row.isActive}
          label={row.isActive ? "● Активно" : "Не активно"}
        />
      ),
      filter: {
        type: "boolean",
        falseLabel: "Не активные",
        trueLabel: "Активные",
        defaultValue: null,
      },
    },
  ];

  const getChildren = (row: Payment) =>
    rows.filter((r) => r.parentId === row.id);

  return <Table columns={columns} rows={rows} getChildren={getChildren} />;
};
