export type ContactKind = "landLine" | "waLine"

export function readContactNumber(kind: ContactKind): string {
  if (typeof document === "undefined") return ""
  return (kind === "landLine" ? document.body.dataset.landLine : document.body.dataset.waLine) || ""
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 10) return value
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
}

export function mexicanWhatsAppUrl(value: string, message?: string): string {
  const digits = value.replace(/\D/g, "")
  return `https://wa.me/52${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`
}
