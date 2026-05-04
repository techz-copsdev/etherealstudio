import { AdminPriceCalculator } from "@/components/admin/AdminPriceCalculator";

export default function AdminPriceCalculatorPage() {
  return (
    <div className="stack">
      <h1 style={{ marginBottom: 0 }}>Kalkulator Harga Jual</h1>
      <p className="muted small">
        Hitung harga jual rekomendasi dari modal + ongkir + margin.
      </p>
      <AdminPriceCalculator />
    </div>
  );
}
