import Image from "next/image";

export const PokemonCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <div className="w-[350px] h-full bg-red-500 m-10 rounded-lg">
        <Image src="/images/logo.svg" alt="Pokemon" width={100} height={100} />
        <h1 className="text-2xl font-bold">Pokemon</h1>
      </div>
    </div>
  );
};
