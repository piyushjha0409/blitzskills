import { ShieldCheck, Terminal, Shield } from "lucide-react";

export function SecurityBadge({ allowedTools }: { allowedTools: string[] }) {
  if (allowedTools.length === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-[2px] text-[10px] font-medium text-gray-500">
        <Shield className="h-2.5 w-2.5" />
        Reviewed
      </span>
    );
  }

  const usesBash = allowedTools.some((t) => t.toLowerCase() === "bash");

  if (usesBash) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-[2px] text-[10px] font-medium text-amber-600">
        <Terminal className="h-2.5 w-2.5" />
        Uses CLI
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-[2px] text-[10px] font-medium text-emerald-600">
      <ShieldCheck className="h-2.5 w-2.5" />
      Safe
    </span>
  );
}
