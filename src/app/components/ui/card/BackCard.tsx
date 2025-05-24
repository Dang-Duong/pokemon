import { PokemonMove } from "@/src/app/libs/pokemonApi";
import { Button } from "@/src/app/components/ui/button/Button";

interface BackCardProps {
  types: Array<{ type: { name: string } }>;
  moves: PokemonMove[];
  getTypeColor: (type: string) => string;
  getTypeBorderColor: (type: string) => string;
  handleCardFlip: (id: number) => void;
  id: number;
  isFlipped: boolean;
}

export const BackCard = ({
  types,
  moves,
  getTypeColor,
  getTypeBorderColor,
  handleCardFlip,
  id,
  isFlipped,
}: BackCardProps) => {
  if (!isFlipped) return null;

  return (
    <div
      className={`absolute w-full h-full bg-white rounded-3xl ${getTypeBorderColor(
        types[0].type.name
      )} border-opacity-80 transition-all duration-500`}
    >
      <div className="p-4 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-4 text-center ">Moves</h3>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {moves?.map((move: PokemonMove, index: number) => (
              <div
                key={index}
                className={`${getTypeColor(
                  types[0].type.name
                )} bg-opacity-20 p-2 rounded-lg text-sm`}
              >
                <span className="font-medium capitalize">
                  {move.move.name.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={() => handleCardFlip(id)}>Back to Stats</Button>
      </div>
    </div>
  );
};
