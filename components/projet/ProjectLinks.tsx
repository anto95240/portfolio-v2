import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { LinkType } from "@/types";

export default function ProjectLinks({ links }: { links: (string | LinkType)[] }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {links.map((link, index) => {
        const isObjectLink = typeof link !== "string";
        const url = isObjectLink ? (link as LinkType).url : (link as string);
        const type = isObjectLink ? (link as LinkType).type : "site";
        
        let label = "Site web";
        if (type === "site") label = "Accéder au site";
        if (type === "github" || type === "code") label = "Accéder au code";

        return (
          <div key={index} className="flex gap-3">
            <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/30">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              <a 
                href={url} 
                className="underline hover:no-underline font-medium" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}