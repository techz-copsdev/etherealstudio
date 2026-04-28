import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Dumbbell,
  Flame,
  MessageCircle,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { PreviewShell } from "@/components/preview/PreviewShell";

export const metadata: Metadata = {
  title: "Grit — Gym & Fitness",
  description: "Preview template gym dengan jadwal kelas, profil coach, paket membership, dan trial WhatsApp.",
};

const memberships = [
  { name: "Drop-in", price: "Rp 150rb", unit: "/sesi", perks: ["1 kali kelas", "Akses peralatan", "Loker harian"], pop: false },
  { name: "Monthly", price: "Rp 950rb", unit: "/bulan", perks: ["Unlimited kelas", "Akses 24/7", "Personal locker", "1× konsultasi coach"], pop: true },
  { name: "Quarterly", price: "Rp 2,55 jt", unit: "/3 bulan", perks: ["Unlimited kelas", "Akses 24/7", "Personal locker", "4× konsultasi coach", "Body composition test"], pop: false },
];

const classes = [
  { d: "Senin", t: "06.00", n: "Strength 101", c: "Coach Reza" },
  { d: "Senin", t: "19.00", n: "HIIT Burner", c: "Coach Adel" },
  { d: "Selasa", t: "06.00", n: "Mobility Flow", c: "Coach Mira" },
  { d: "Rabu", t: "19.30", n: "Hyrox Prep", c: "Coach Reza" },
  { d: "Jumat", t: "06.00", n: "Power Lift", c: "Coach Bram" },
  { d: "Sabtu", t: "08.00", n: "Conditioning", c: "Coach Adel" },
];

export default function GymGritPreview() {
  return (
    <PreviewShell templateName="Grit — Gym & Fitness">
      <section className="relative overflow-hidden bg-[#0B0B0C] text-paper">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #B8924E 0%, transparent 50%), repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 24px)",
          }}
          aria-hidden
        />
        <header className="relative">
          <div className="container-wide flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[18px] font-medium uppercase tracking-widest2">
              <span className="grid h-8 w-8 place-items-center bg-[#B8924E] text-[#0B0B0C]">
                <Dumbbell className="h-4 w-4" />
              </span>
              GRIT GYM
            </div>
            <nav className="hidden items-center gap-7 text-sm text-paper/70 md:flex">
              <a href="#kelas">Kelas</a>
              <a href="#coach">Coach</a>
              <a href="#paket">Membership</a>
              <a href="#trial">Trial</a>
            </nav>
            <a
              href="#trial"
              className="inline-flex h-9 items-center gap-1.5 bg-[#B8924E] px-4 text-sm font-bold uppercase tracking-widest2 text-[#0B0B0C] hover:bg-[#D4A861]"
            >
              Free Trial
            </a>
          </div>
        </header>

        <div className="container-wide relative grid grid-cols-1 gap-12 pb-24 pt-16 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-[#B8924E]">
              <span className="h-px w-8 bg-[#B8924E]" /> Performance Gym · Sudirman
            </p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tightish md:text-[88px]">
              <span className="block">TRAIN HARDER.</span>
              <span className="block text-[#B8924E]">RECOVER SMARTER.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-paper/75 md:text-lg">
              Gym performance untuk yang serius. Coach bersertifikasi, peralatan pro, dan program
              terstruktur — bukan tempat selfie.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#trial"
                className="inline-flex h-12 items-center gap-2 bg-[#B8924E] px-6 font-bold uppercase tracking-widest2 text-[#0B0B0C] hover:bg-[#D4A861]"
              >
                <Flame className="h-4 w-4" /> Booking Free Trial
              </a>
              <a
                href="#kelas"
                className="inline-flex h-12 items-center gap-2 border border-paper/30 px-6 font-bold uppercase tracking-widest2 hover:bg-paper/10"
              >
                Lihat jadwal <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-paper/15 pt-8">
              {[
                { i: Users, v: "1.800+", l: "Active members" },
                { i: Trophy, v: "12", l: "Coach bersertifikat" },
                { i: Timer, v: "24/7", l: "Open access" },
              ].map((s) => (
                <div key={s.l}>
                  <s.i className="h-4 w-4 text-[#B8924E]" />
                  <div className="mt-2 font-display text-3xl">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest2 text-paper/50">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[400px] overflow-hidden bg-gradient-to-br from-[#1A1A1C] via-[#0B0B0C] to-[#1A1A1C]">
              <div className="absolute inset-0 grid place-items-center">
                <Dumbbell className="h-48 w-48 text-[#B8924E]/15" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 border-l-2 border-[#B8924E] bg-paper/[0.04] p-5 backdrop-blur">
                <p className="text-[10px] uppercase tracking-widest2 text-[#B8924E]">Hari ini</p>
                <p className="mt-1 font-display text-xl">19.00 · HIIT Burner</p>
                <p className="mt-1 text-xs text-paper/60">3 slot tersisa · Coach Adel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="kelas" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Jadwal Kelas</p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-tightish text-[#0B0B0C] md:text-5xl">
                Group class · 6 hari/minggu
              </h2>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
            <table className="w-full text-sm">
              <thead className="bg-[#0B0B0C] text-[10px] uppercase tracking-widest2 text-paper/70">
                <tr>
                  <th className="px-5 py-3 text-left">Hari</th>
                  <th className="px-5 py-3 text-left">Jam</th>
                  <th className="px-5 py-3 text-left">Kelas</th>
                  <th className="px-5 py-3 text-left">Coach</th>
                  <th className="px-5 py-3 text-right" />
                </tr>
              </thead>
              <tbody>
                {classes.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-paper" : "bg-[#FAF8F3]"}>
                    <td className="px-5 py-4 font-medium">{c.d}</td>
                    <td className="px-5 py-4 text-ink-600">{c.t}</td>
                    <td className="px-5 py-4 font-display text-base">{c.n}</td>
                    <td className="px-5 py-4 text-ink-600">{c.c}</td>
                    <td className="px-5 py-4 text-right">
                      <a href="#trial" className="text-[#7A6428] hover:underline">
                        Booking →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="coach" className="border-t border-ink/10 bg-[#FAF8F3]">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Coach</p>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-tightish text-[#0B0B0C] md:text-5xl">
            Tim coach yang sudah Anda lihat hasilnya.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "Reza M.", s: "Strength · Powerlifting" },
              { n: "Adel R.", s: "HIIT · Conditioning" },
              { n: "Mira S.", s: "Mobility · Pilates" },
              { n: "Bram K.", s: "Hyrox · Endurance" },
            ].map((c) => (
              <article key={c.n}>
                <div className="aspect-[3/4] bg-gradient-to-br from-[#1A1A1C] to-[#0B0B0C]" />
                <h3 className="mt-4 font-display text-lg uppercase">{c.n}</h3>
                <p className="text-xs uppercase tracking-widest2 text-[#7A6428]">{c.s}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section id="paket" className="bg-paper">
        <div className="container-wide py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-widest2 text-[#7A6428]">Membership</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase tracking-tightish text-[#0B0B0C] md:text-5xl">
            Paket yang transparan, tanpa biaya tersembunyi.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 md:grid-cols-3">
            {memberships.map((m) => (
              <article
                key={m.name}
                className={
                  "relative flex h-full flex-col p-8 " +
                  (m.pop ? "bg-[#0B0B0C] text-paper" : "bg-paper text-[#0B0B0C]")
                }
              >
                {m.pop ? (
                  <span className="absolute right-6 top-6 bg-[#B8924E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest2 text-[#0B0B0C]">
                    Most Popular
                  </span>
                ) : null}
                <Zap className={"h-6 w-6 " + (m.pop ? "text-[#B8924E]" : "text-[#7A6428]")} />
                <h3 className="mt-5 font-display text-2xl uppercase tracking-tightish">{m.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl">{m.price}</span>
                  <span className={"text-sm " + (m.pop ? "text-paper/70" : "text-ink-500")}>{m.unit}</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-[14.5px]">
                  {m.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2
                        className={"mt-0.5 h-4 w-4 shrink-0 " + (m.pop ? "text-[#B8924E]" : "text-[#7A6428]")}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#trial"
                  className={
                    "mt-7 inline-flex h-11 items-center justify-center font-bold uppercase tracking-widest2 " +
                    (m.pop
                      ? "bg-[#B8924E] text-[#0B0B0C] hover:bg-[#D4A861]"
                      : "border border-[#0B0B0C] text-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-paper")
                  }
                >
                  Pilih paket
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <section id="trial" className="bg-[#0B0B0C] text-paper">
        <div className="container-wide py-20 md:py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-[#B8924E]">Free Trial</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[1] tracking-tightish md:text-6xl">
                COBA SEKALI. <br />
                <span className="text-[#B8924E]">RASAKAN BEDANYA.</span>
              </h2>
              <p className="mt-6 max-w-md text-paper/70">
                Booking 1 sesi gratis · pengantaran briefing oleh head coach. Slot terbatas tiap minggu.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-paper/70">
                <CalendarClock className="h-4 w-4 text-[#B8924E]" /> Konfirmasi dalam 30 menit
              </p>
            </div>
            <a
              href="https://wa.me/628123456789?text=Halo%20GRIT%20Gym%2C%20saya%20mau%20booking%20free%20trial."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 self-start bg-[#B8924E] px-6 font-bold uppercase tracking-widest2 text-[#0B0B0C] hover:bg-[#D4A861] md:self-end"
            >
              <MessageCircle className="h-4 w-4" /> Booking via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-paper/10 bg-[#0B0B0C] text-paper">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-8 text-xs uppercase tracking-widest2 text-paper/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} GRIT Gym · Performance Studio</p>
          <p>
            <Link href="/templates" className="text-[#B8924E] hover:underline">
              Template by Ethereal Studio
            </Link>
          </p>
        </div>
      </footer>
    </PreviewShell>
  );
}
