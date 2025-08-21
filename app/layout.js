import Preloader from "./components/Preloader";
import "./styles/globals.css";
import { Luckiest_Guy, Fredoka } from 'next/font/google';

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest', // Create CSS variable
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-fredoka',
});

export const metadata = {
  title: "Dark Pengu",
  description: "Darkness is here for all of us. Dark Pengu is the bringer of void.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="`${luckiestGuy.variable} ${fredoka.variable}">
        <Preloader heroId="hero" timeoutMs={8000} />
        {children}
      </body>
    </html>
  );
}
