import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="admin-shell">
        <AdminSidebar />
        <div className="admin-main">{children}</div>
      </div>
    </AdminAuthGate>
  );
}
