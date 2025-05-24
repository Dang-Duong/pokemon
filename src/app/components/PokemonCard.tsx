"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  pokemonApi,
  Pokemon,
  PokemonStat,
} from "@/src/app/services/pokemonApi";
import { gsap } from "@/libs/gsap";

export const PokemonCard = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const list = await pokemonApi.getPokemonList(15, 0);
        const details = await Promise.all(
          list.results.map((p) => pokemonApi.getPokemon(p.name))
        );
        setPokemons(details);
      } catch {
        setPokemons([]);
      }
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (!loading && pokemons.length > 0) {
      const container = document.querySelector(
        "[data-animate-stagger-container='true']"
      );
      if (container) {
        const elements = gsap.utils.toArray("[data-animate]", container);
        gsap.to(elements, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 1.5,
          ease: "power1.out",
        });
      }
    }
  }, [loading, pokemons]);

  return (
    <div
      data-animate-stagger-container="true"
      className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-10 p-10"
    >
      {pokemons.map((pokemon) => {
        const stats = {
          hp:
            pokemon.stats?.find((s: PokemonStat) => s.stat.name === "hp")
              ?.base_stat ?? 0,
          attack:
            pokemon.stats?.find((s: PokemonStat) => s.stat.name === "attack")
              ?.base_stat ?? 0,
          defense:
            pokemon.stats?.find((s: PokemonStat) => s.stat.name === "defense")
              ?.base_stat ?? 0,
          "special-attack":
            pokemon.stats?.find(
              (s: PokemonStat) => s.stat.name === "special-attack"
            )?.base_stat ?? 0,
          "special-defense":
            pokemon.stats?.find(
              (s: PokemonStat) => s.stat.name === "special-defense"
            )?.base_stat ?? 0,
          speed:
            pokemon.stats?.find((s: PokemonStat) => s.stat.name === "speed")
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

        const getTypeColor = (type: string) =>
          typeColors[type] || "bg-gray-400";

        return (
          <div
            key={pokemon.id}
            data-animate
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative opacity-0"
          >
            <span className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-xs font-bold shadow">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={140}
              height={140}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 capitalize">
              {pokemon.name}
            </h2>
            <div className="flex gap-2 mb-4">
              {pokemon.types.map((t) => (
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
            <div className="w-full mb-2">
              {Object.entries(stats).map(([stat, value]) => (
                <div key={stat}>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="capitalize">{stat.replace("-", " ")}</span>
                    <span>{value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
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
            <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              View Moves
            </button>
          </div>
        );
      })}
    </div>
  );
};
