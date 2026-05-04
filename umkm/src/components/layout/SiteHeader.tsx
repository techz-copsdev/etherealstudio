import Link from "next/link";
import { config } from "@/config/app.config";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container>
        <Link href="/" className="brand">
          <span className="brand-mark">U</span>
          <span>{config.brand.name}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/">Katalog</Link>
          {config.enableTracking && <Link href="/track">Lacak</Link>}
          <Link href="/admin" className="nav-keep">Admin</Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
