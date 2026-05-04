import { config } from "@/config/app.config";

export const metadata = { title: "Pengaturan" };

export default function AdminSettingsPage() {
  return (
    <div className="stack-loose">
      <div>
        <h1 style={{ margin: 0 }}>Pengaturan</h1>
        <span className="muted small">Atur preferensi toko & integrasi.</span>
      </div>

      <div className="grid grid-2">
        <div className="card card-loose">
          <h3>Profil Toko</h3>
          <div className="stack-tight">
            <div>
              <label>Nama Toko</label>
              <input defaultValue={config.brand.name} readOnly />
            </div>
            <div>
              <label>Tagline</label>
              <input defaultValue={config.brand.tagline} readOnly />
            </div>
            <div>
              <label>WhatsApp Admin</label>
              <input defaultValue={config.whatsappNumber} readOnly />
            </div>
            <p className="muted small">
              Edit file <code>.env.local</code> lalu restart dev server untuk
              mengubah profil. Pengaturan disimpan via env var, bukan database.
            </p>
          </div>
        </div>

        <div className="card card-loose">
          <h3>Integrasi</h3>
          <div className="stack-tight">
            <div className="row-between">
              <span>Mode Data</span>
              <span className="badge badge-primary">
                {config.mode === "cloud" ? "Cloud (Supabase)" : "Local (JSON)"}
              </span>
            </div>
            <div className="row-between">
              <span>Live Chat</span>
              <span className={`badge ${config.enableLiveChat ? "badge-success" : "badge-muted"}`}>
                {config.enableLiveChat ? "Aktif" : "Nonaktif"}
              </span>
            </div>
            <div className="row-between">
              <span>Tracking Resi</span>
              <span className={`badge ${config.enableTracking ? "badge-success" : "badge-muted"}`}>
                {config.enableTracking ? "Aktif" : "Nonaktif"}
              </span>
            </div>
            <div className="row-between">
              <span>Default Ongkir</span>
              <span className="tabular">Rp {config.shipping.defaultCost.toLocaleString("id-ID")}</span>
            </div>
            <div className="row-between">
              <span>Storage Bucket</span>
              <span className="tabular">{config.supabase.bucket}</span>
            </div>
          </div>
        </div>

        <div className="card card-loose">
          <h3>Status Supabase</h3>
          <div className="stack-tight">
            <div className="row-between">
              <span>URL</span>
              <span className="tabular small muted">{config.supabase.url || "(belum diatur)"}</span>
            </div>
            <div className="row-between">
              <span>Anon Key</span>
              <span className="tabular small muted">
                {config.supabase.anonKey ? "•••••••• (set)" : "(belum diatur)"}
              </span>
            </div>
            <p className="muted small">
              Service key adalah env <code>SUPABASE_SERVICE_KEY</code> (server-only). Tidak ditampilkan di sini.
              Schema tabel ada di file <code>schema.sql</code> di root project.
            </p>
          </div>
        </div>

        <div className="card card-loose">
          <h3>Akses Admin</h3>
          <div className="stack-tight">
            <div className="row-between">
              <span>Kode Admin</span>
              <span className="tabular small muted">{config.admin.accessCode ? "••••••" : "(belum diatur)"}</span>
            </div>
            <p className="muted small">
              Kode disimpan di env <code>NEXT_PUBLIC_ADMIN_CODE</code>. Ini hanya gerbang client-side
              untuk demo — bukan auth produksi. Untuk produksi gunakan Supabase Auth atau middleware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
