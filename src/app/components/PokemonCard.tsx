"use client";

import { useEffect, useState } from "react";
import { pokemonApi, Pokemon, PokemonStat } from "@/src/app/libs/pokemonApi";
import { gsap } from "@/src/app/libs/gsap";
import { useGSAP } from "@gsap/react";
import { FrontCard } from "@/src/app/components/ui/card/FrontCard";
import { BackCard } from "@/src/app/components/ui/card/BackCard";
import { LoadMore } from "@/src/app/components/ui/button/LoadMore";

export const PokemonCard = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const list = await pokemonApi.getPokemonList(15, 0);
        const details = await Promise.all(
          list.results.map(({ name }) => pokemonApi.getPokemon(name))
        );
        setPokemons(details);
        setOffset(15);
      } catch {
        setPokemons([]);
      }
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const loadMorePokemons = async () => {
    setLoadingMore(true);
    setIsInitialLoad(false);
    try {
      const list = await pokemonApi.getPokemonList(10, offset);
      const details = await Promise.all(
        list.results.map(({ name }) => pokemonApi.getPokemon(name))
      );
      setPokemons((prev) => [...prev, ...details]);
      setOffset((prev) => prev + 10);
    } catch (error) {
      console.error("Failed to load more Pokémon:", error);
    }
    setLoadingMore(false);
  };

  useGSAP(
    () => {
      if (!loading && pokemons.length > 0) {
        const container = document.querySelector(
          "[data-animate-stagger-container='true']"
        );
        if (container) {
          const elements = gsap.utils.toArray("[data-animate]", container);

          if (isInitialLoad) {
            // Initial load: use delay and stagger
            gsap.to(elements, {
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              delay: 1.5,
              ease: "power1.out",
            });
          } else {
            // Load more: animate only new cards quickly without delay
            const newElements = elements.slice(-10); // Get last 10 elements (newly added)
            gsap.to(newElements, {
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "power1.out",
            });
          }
        }
      }
    },
    { dependencies: [loading, pokemons, isInitialLoad] }
  );

  const handleCardFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div
        data-animate-stagger-container="true"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-4 p-10"
      >
        {pokemons.map(({ id, name, types, sprites, stats, moves }) => {
          const statsData = {
            hp:
              stats?.find((s: PokemonStat) => s.stat.name === "hp")
                ?.base_stat ?? 0,
            attack:
              stats?.find((s: PokemonStat) => s.stat.name === "attack")
                ?.base_stat ?? 0,
            defense:
              stats?.find((s: PokemonStat) => s.stat.name === "defense")
                ?.base_stat ?? 0,
            "special-attack":
              stats?.find((s: PokemonStat) => s.stat.name === "special-attack")
                ?.base_stat ?? 0,
            "special-defense":
              stats?.find((s: PokemonStat) => s.stat.name === "special-defense")
                ?.base_stat ?? 0,
            speed:
              stats?.find((s: PokemonStat) => s.stat.name === "speed")
                ?.base_stat ?? 0,
          };

          const statColors = {
            hp: "bg-red-400",
            attack: "bg-orange-400",
            defense: "bg-blue-400",
            "special-attack": "bg-purple-400",
            "special-defense": "bg-green-400",
            speed: "bg-yellow-400",
          };

          const typeColors: Record<string, string> = {
            normal: "bg-pokemon-normal",
            fire: "bg-pokemon-fire",
            water: "bg-pokemon-water",
            electric: "bg-pokemon-electric",
            grass: "bg-pokemon-grass",
            ice: "bg-pokemon-ice",
            fighting: "bg-pokemon-fighting",
            poison: "bg-pokemon-poison",
            ground: "bg-pokemon-ground",
            flying: "bg-pokemon-flying",
            psychic: "bg-pokemon-psychic",
            bug: "bg-pokemon-bug",
            rock: "bg-pokemon-rock",
            ghost: "bg-pokemon-ghost",
            dragon: "bg-pokemon-dragon",
            dark: "bg-pokemon-dark",
            steel: "bg-pokemon-steel",
            fairy: "bg-pokemon-fairy",
          };

          const typeBorderColors: Record<string, string> = {
            normal: "border-pokemon-normal",
            fire: "border-pokemon-fire",
            water: "border-pokemon-water",
            electric: "border-pokemon-electric",
            grass: "border-pokemon-grass",
            ice: "border-pokemon-ice",
            fighting: "border-pokemon-fighting",
            poison: "border-pokemon-poison",
            ground: "border-pokemon-ground",
            flying: "border-pokemon-flying",
            psychic: "border-pokemon-psychic",
            bug: "border-pokemon-bug",
            rock: "border-pokemon-rock",
            ghost: "border-pokemon-ghost",
            dragon: "border-pokemon-dragon",
            dark: "border-pokemon-dark",
            steel: "border-pokemon-steel",
            fairy: "border-pokemon-fairy",
          };
          const getTypeBorderColor = (type: string) =>
            typeBorderColors[type] || "border-gray-400";

          const getTypeColor = (type: string) =>
            typeColors[type] || "bg-gray-400";

          const isFlipped = flippedCards[id] || false;

          return (
            <div
              key={id}
              data-animate
              className={`bg-white rounded-3xl shadow-lg flex flex-col items-center relative opacity-0 border-[12px] ${getTypeBorderColor(
                types[0].type.name
              )} border-opacity-80 transition-transform duration-700 preserve-3d ${
                isFlipped ? "flip-card" : "flip-card-normal"
              }`}
            >
              <FrontCard
                id={id}
                name={name}
                types={types}
                sprites={sprites}
                statsData={statsData}
                statColors={statColors}
                getTypeColor={getTypeColor}
                handleCardFlip={handleCardFlip}
                isFlipped={isFlipped}
              />

              <BackCard
                types={types}
                moves={moves}
                getTypeColor={getTypeColor}
                getTypeBorderColor={getTypeBorderColor}
                handleCardFlip={handleCardFlip}
                id={id}
                isFlipped={isFlipped}
              />
            </div>
          );
        })}
      </div>
      <LoadMore onLoadMore={loadMorePokemons} loading={loadingMore} />
    </>
  );
};
