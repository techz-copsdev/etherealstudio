import { AdminChatUI } from "@/components/admin/AdminChatUI";

export const metadata = { title: "Chat" };

export default function AdminChatPage() {
  return (
    <div className="stack-loose">
      <div>
        <h1 style={{ margin: 0 }}>Chat</h1>
        <span className="muted small">
          Tampilan WhatsApp simulasi untuk demo. Percakapan asli tetap berjalan di WhatsApp Anda.
        </span>
      </div>
      <AdminChatUI />
    </div>
  );
}
