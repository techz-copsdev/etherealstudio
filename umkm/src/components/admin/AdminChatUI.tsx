"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Search, MessageCircle } from "lucide-react";

interface ChatMessage {
  from: "customer" | "admin";
  text: string;
  ts: string;
}

interface ChatThread {
  id: string;
  customerName: string;
  customerWa: string;
  messages: ChatMessage[];
  lastTs: string;
  unread: number;
}

const DEMO_THREADS: ChatThread[] = [
  {
    id: "T1",
    customerName: "Budi Santoso",
    customerWa: "+62 812-3456-7890",
    lastTs: "10:32",
    unread: 2,
    messages: [
      { from: "customer", text: "Halo, saya mau order Kopi Bubuk 250gr. Stok ada?", ts: "10:25" },
      { from: "admin", text: "Halo Pak Budi, stok ready. Mau berapa pcs?", ts: "10:27" },
      { from: "customer", text: "Saya mau 50 pcs, total brp ya?", ts: "10:30" },
      { from: "customer", text: "Sama tolong info ongkir ke Bandung", ts: "10:32" }
    ]
  },
  {
    id: "T2",
    customerName: "Siti Nurhaliza",
    customerWa: "+62 813-9876-5432",
    lastTs: "Kemarin",
    unread: 0,
    messages: [
      { from: "customer", text: "Min, kalau ambil 1 lusin gula pasir berapa?", ts: "Kemarin 14:10" },
      { from: "admin", text: "Halo kak, harga lusin Rp 13.500/pcs ya. Free ongkir Jabodetabek minimum 100rb.", ts: "Kemarin 14:15" },
      { from: "customer", text: "Oke siap, nanti saya order langsung dari web", ts: "Kemarin 14:20" }
    ]
  },
  {
    id: "T3",
    customerName: "Pak Joko",
    customerWa: "+62 821-1111-2222",
    lastTs: "2 hari lalu",
    unread: 0,
    messages: [
      { from: "customer", text: "Bisa minta katalog terbaru?", ts: "Senin 09:15" },
      { from: "admin", text: "Boleh kak, ini link katalog kami: bulkorder.id/produk", ts: "Senin 09:20" },
      { from: "customer", text: "Sip, terima kasih", ts: "Senin 09:30" }
    ]
  },
  {
    id: "T4",
    customerName: "Toko Sehat Sejahtera",
    customerWa: "+62 877-5555-6666",
    lastTs: "3 hari lalu",
    unread: 1,
    messages: [
      { from: "customer", text: "Mau order minyak goreng 96 pcs untuk warung", ts: "Sabtu 11:00" },
      { from: "admin", text: "Siap kak, harga 96+ pcs Rp 18.800/pcs. Total Rp 1.804.800. Mau dikirim kemana?", ts: "Sabtu 11:15" },
      { from: "customer", text: "Jl. Mawar No. 12 Jakarta Timur. Tolong kirim invoicenya ya", ts: "Sabtu 11:30" }
    ]
  }
];

const QUICK_REPLIES = [
  "Halo kak, ada yang bisa kami bantu?",
  "Stok ready ya, silakan dipesan.",
  "Untuk harga grosir, minimum order ya kak.",
  "Pengiriman 1–2 hari kerja.",
  "Pembayaran via transfer manual ke admin ya."
];

export function AdminChatUI() {
  const [threads, setThreads] = useState<ChatThread[]>(DEMO_THREADS);
  const [activeId, setActiveId] = useState<string>(DEMO_THREADS[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () =>
      threads.filter((t) =>
        `${t.customerName} ${t.customerWa}`.toLowerCase().includes(search.toLowerCase())
      ),
    [threads, search]
  );

  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length, activeId]);

  function send() {
    const text = draft.trim();
    if (!text || !active) return;
    const ts = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? {
              ...t,
              messages: [...t.messages, { from: "admin", text, ts }],
              lastTs: ts,
              unread: 0
            }
          : t
      )
    );
    setDraft("");
  }

  function pickQuickReply(text: string) {
    setDraft(text);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chat-shell">
      <div className="chat-list">
        <div className="chat-list-search">
          <div className="search-input">
            <Search size={14} className="search-icon" />
            <input
              placeholder="Cari pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {filtered.length === 0 && (
          <div className="empty" style={{ padding: 32 }}>Tidak ada percakapan.</div>
        )}
        {filtered.map((t) => {
          const last = t.messages[t.messages.length - 1];
          const initials = t.customerName
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          return (
            <button
              key={t.id}
              type="button"
              className={`chat-list-item ${t.id === active?.id ? "active" : ""}`}
              onClick={() => {
                setActiveId(t.id);
                setThreads((prev) => prev.map((x) => (x.id === t.id ? { ...x, unread: 0 } : x)));
              }}
            >
              <div className="chat-avatar">{initials}</div>
              <div className="chat-list-meta">
                <div className="chat-list-name">
                  <strong>{t.customerName}</strong>
                  <span className="ts">{t.lastTs}</span>
                </div>
                <div className="chat-list-preview">
                  {last?.from === "admin" ? "Anda: " : ""}
                  {last?.text ?? ""}
                </div>
              </div>
              {t.unread > 0 && (
                <span className="badge badge-primary" style={{ alignSelf: "center" }}>
                  {t.unread}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="chat-thread">
        {!active ? (
          <div className="empty" style={{ margin: "auto" }}>
            <MessageCircle size={32} style={{ marginBottom: 8 }} />
            <div>Pilih percakapan untuk mulai membalas</div>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <div className="chat-avatar">
                {active.customerName
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <strong>{active.customerName}</strong>
                <div className="small">{active.customerWa}</div>
              </div>
            </div>

            <div className="chat-messages">
              {active.messages.map((m, i) => (
                <div
                  key={i}
                  className={`chat-bubble ${m.from === "admin" ? "outgoing" : ""}`}
                >
                  {m.text}
                  <span className="ts">{m.ts}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-quickreplies">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  className="chat-quickreply"
                  type="button"
                  onClick={() => pickQuickReply(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ketik balasan..."
              />
              <button type="button" className="btn" onClick={send} disabled={!draft.trim()}>
                <Send size={16} />
                Kirim
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
