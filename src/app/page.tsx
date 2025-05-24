import { Header } from "./components/header/Header";
import { PokemonCard } from "./components/PokemonCard";
import AnimationProvider from "./providers/AnimationProvider";

import { SearchBar } from "./components/ui/searchBar/SearchBar";

export default function Home() {
  return (
    <div>
      <AnimationProvider>
        <Header />
        <SearchBar />
        <PokemonCard />
      </AnimationProvider>
    </div>
  );
}
