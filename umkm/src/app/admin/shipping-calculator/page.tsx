import { AdminShippingCalculator } from "@/components/admin/AdminShippingCalculator";

export default function AdminShippingCalculatorPage() {
  return (
    <div className="stack">
      <h1 style={{ marginBottom: 0 }}>Kalkulator Ongkir</h1>
      <p className="muted small">
        Estimasi ongkir per wilayah dengan opsi override manual.
      </p>
      <AdminShippingCalculator />
    </div>
  );
}
