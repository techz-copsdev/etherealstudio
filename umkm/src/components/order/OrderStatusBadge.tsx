import type { OrderStatus } from "@/modules/order/invoice";

const LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Dibayar",
  process: "Diproses",
  done: "Selesai",
  archived: "Arsip"
};

interface Props {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: Props) {
  return <span className={`badge status-${status}`}>{LABELS[status]}</span>;
}
