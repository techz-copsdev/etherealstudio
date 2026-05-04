import { config } from "@/config/app.config";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="row-between">
          <div>
            © {new Date().getFullYear()} {config.brand.name}. Pesan via WhatsApp.
          </div>
          <div className="muted">
            Mode: {config.mode === "cloud" ? "Cloud" : "Local"}
          </div>
        </div>
      </Container>
    </footer>
  );
}
