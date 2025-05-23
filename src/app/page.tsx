import { Header } from "./components/header/Header";
import { PokemonCard } from "./components/PokemonCard";
import AnimationProvider from "./components/ui/animationProvider.tsx/AnimationProvider";

export default function Home() {
  return (
    <div>
      <AnimationProvider>
        <Header />
        <PokemonCard />
      </AnimationProvider>
    </div>
  );
}
