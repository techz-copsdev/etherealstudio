import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: { default: "Preview", template: "%s · Preview" },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="preview-root">{children}</div>;
}
