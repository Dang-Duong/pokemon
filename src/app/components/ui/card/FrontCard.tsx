import Image from "next/image";
import { Button } from "@/src/app/components/ui/button/Button";

interface FrontCardProps {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  statsData: Record<string, number>;
  statColors: Record<string, string>;
  getTypeColor: (type: string) => string;
  handleCardFlip: (id: number) => void;
  isFlipped: boolean;
}

export const FrontCard = ({
  id,
  name,
  types,
  sprites,
  statsData,
  statColors,
  getTypeColor,
  handleCardFlip,
  isFlipped,
}: FrontCardProps) => {
  if (isFlipped) return null;

  return (
    <>
      {/* Front of card */}
      <span className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-xs font-bold shadow frontface-hidden">
        #{id.toString().padStart(3, "0")}
      </span>
      <div
        className={` bg-opacity-50 ${getTypeColor(
          types[0].type.name
        )} w-full h-full flex justify-center items-center `}
      >
        <Image
          src={sprites.other["official-artwork"].front_default}
          alt={name}
          width={140}
          height={140}
          className="my-4 "
        />
      </div>

      <h2 className="text-2xl font-pokemon-solid text-black my-4 capitalize">
        {name}
      </h2>
      <div className="flex gap-2 mb-2">
        {types.map((t) => (
          <span
            key={t.type.name}
            className={`${getTypeColor(
              t.type.name
            )} text-white rounded-full px-3 py-1 text-xs font-semibold`}
          >
            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
          </span>
        ))}
      </div>
      <div className="w-full mb-2 px-4">
        {Object.entries(statsData).map(([stat, value]) => (
          <div key={stat}>
            <div className="flex justify-between text-xs text-gray-600">
              <span className=" capitalize">{stat.replace("-", " ")}</span>
              <span>{value}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden my-1.5">
              <div
                className={`h-full ${
                  statColors[stat as keyof typeof statColors]
                }`}
                style={{ width: `${(value / 100) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full p-4">
        <Button onClick={() => handleCardFlip(id)}>View Moves</Button>
      </div>
    </>
  );
};
