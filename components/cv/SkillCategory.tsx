import Image from "next/image";
import { SkillItem } from "@/types";

export default function renderCategory (list: SkillItem[], title: string) {
  if (!list?.length) return null;

  return (
    <div className="skills-container mb-10">
      <p className="mb-5 font-bold text-lg border-b border-gray-200 pb-2">
        {title}
      </p>
      <div className="flex flex-row flex-wrap gap-6 justify-center md:justify-start">
        {list.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center group w-24 lg:w-32 skills-anim"
          >
            <div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2">
              <Image
                src={skill.images}
                alt={skill.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-medium text-center">{skill.title}</p>
            <p className="text-[10px] text-gray-500 text-center italic mt-1">
              {skill.usage}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
