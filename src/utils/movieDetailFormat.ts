import type { MovieReleaseDates } from "../services/movieService";

export function formatRuntimeMinutes(minutes: number | null | undefined): string {
  if (minutes == null || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function getUsCertification(releaseDates: MovieReleaseDates | undefined): string {
  const us = releaseDates?.results?.find((r) => r.iso_3166_1 === "US");
  if (!us?.release_dates?.length) return "";
  const withCert = us.release_dates.find((d) => d.certification?.trim());
  return withCert?.certification?.trim() ?? "";
}

export function getDirectorName(crew: { job: string; name: string }[]): string {
  if (!crew) return "—";
  return crew.find((c) => c.job === "Director")?.name ?? "—";
}

export function buildMetaLine(year: string, runtimeStr: string, certification: string): string {
  const parts = [year, runtimeStr, certification].filter(Boolean);
  return parts.join(" • ");
}

export function computeHeroHeight(width: number, hasBackdrop: boolean): number {
  if (hasBackdrop) {
    return Math.round((width * 9) / 16);
  }
  const portraitH = Math.round((width * 3) / 2);
  return Math.min(portraitH, Math.round(width * 1.35));
}
