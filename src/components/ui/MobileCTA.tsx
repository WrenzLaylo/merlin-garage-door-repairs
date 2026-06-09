import { MdPhone } from "react-icons/md";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";

export default function MobileCTA({ config }: { config: NetworkConfig }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-3 backdrop-blur md:hidden">
      <a
        href={`tel:${config.contact.emergency.tel}`}
        onClick={() => trackCall("emergency")}
        className="btn-accent w-full text-base"
      >
        <MdPhone size={18} /> Call {config.contact.emergency.number}
      </a>
    </div>
  );
}
