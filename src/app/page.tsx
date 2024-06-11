import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center  lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-bold text-2xl"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            $BORED
          </a>
        </div>
        <div className="flex flex-row gap-2 justify-center">
        <a href="https://t.me/mnatsboredcoin" target="blank" className="font-bold font-2xl py-2 px-4 border border-black border-2 rounded">
          TG
        </a>
        <a href="https://pump.fun/5E4cppid8BSqgdsa4aKHu45rCUspuVqEty4Wa95ipump" target="blank" className="font-bold font-2xl py-2 px-4 border border-black border-2 rounded">
          BUY
        </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full  before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3  after:content-[''] after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/bored.png"
          alt="Next.js Logo"
          width={600}
          height={600}
          priority
        />
      </div>

    </main>
  );
}
