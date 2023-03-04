export default function Home() {
  return (
    <div className="relative py-24 sm:py-32 lg:pb-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            ETH Denver 2023:
            <div className="mt-3">
              Hack-a-Team
            </div>
          </h1>
          <p className="mt-10 text-lg leading-8 text-gray-300">
            Sign up as a <span className="italic">Hacker</span> or a <span className="italic">Captain</span> and create your winning team.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/sign-up"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
