import { config } from "@/config/app.config";
import { localAdapter } from "@/adapters/localAdapter";
import { supabaseAdapter } from "@/adapters/supabaseAdapter";
import type { DataAdapter } from "@/adapters/types";

/** Resolve the active data adapter based on app config. */
export function getDataAdapter(): DataAdapter {
  return config.mode === "cloud" ? supabaseAdapter : localAdapter;
}
