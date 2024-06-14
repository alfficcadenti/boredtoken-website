import type { Metadata } from "next";
import { Inter, Rubik_Mono_One, Ubuntu_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const rubik = Bebas_Neue({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "$BORED",
  description: "Bored token on solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5PZC7KGV21" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5PZC7KGV21');
          `}
        </Script>
      </head>
      <body className={rubik.className}>
        <header className="sticky top-0 z-50 flex flex-row justify gap-4 text-xl p-12 ">
          <div className="text-black">$BORED</div>
          <div className="grow"></div>
         
          <a className="text-black" target="blank" href="https://x.com/bored_coin_">TWITTER</a>
          <a className="text-black" target="blank" href="https://t.me/mnatsboredcoin">TELEGRAM</a>
          <a className="text-black" target="blank" href="https://raydium.io/swap/?inputMint=5E4cppid8BSqgdsa4aKHu45rCUspuVqEty4Wa95ipump&outputMint=sol">5E..pump</a>
        </header>

        {children}
      </body>
    </html>
  );
}
