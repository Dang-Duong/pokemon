import { Header } from "./components/header/Header";
import { PokemonCard } from "./components/PokemonCard";
import AnimationProvider from "./providers/AnimationProvider";
import { SearchBar } from "./components/ui/searchBar/SearchBar";
import { Background } from "./components/background/Background";

export default function Home() {
  return (
    <div>
      <AnimationProvider>
        <Background />
        <Header />
        <SearchBar />
        <PokemonCard />
      </AnimationProvider>
    </div>
  );
}
