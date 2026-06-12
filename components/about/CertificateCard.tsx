import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface CertificateCardProps {
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
}

export default function CertificateCard({
  name,
  issuer,
  issued_date,
  credential_url,
}: CertificateCardProps) {
  const card = (
    <div
      className={`group flex h-full flex-col gap-3 rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 ${
        credential_url
          ? "cursor-pointer hover:border-red-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-50/50"
          : ""
      }`}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-50 ring-1 ring-red-100/80">
        <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-red-500" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold leading-snug text-slate-900">{name}</p>
        <p className="mt-1 text-xs text-slate-500">{issuer}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-red-100/40 pt-3">
        <span className="text-[11px] text-slate-500">{issued_date}</span>
        {credential_url && (
          <span className="flex items-center gap-1 text-[11px] text-red-400/70 transition-colors group-hover:text-red-600">
            Lihat
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (credential_url) {
    return (
      <a href={credential_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </a>
    );
  }
  return card;
}
