import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  src: "../../public/fonts/Roboto-Regular.woff",
});

const pokemonSolid = localFont({
  src: "../../public/fonts/Pokemon-Solid.woff",
});

const pokemonHollow = localFont({
  src: "../../public/fonts/Pokemon-Hollow.woff",
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.className}
          ${pokemonSolid.className}
          ${pokemonHollow.className}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
