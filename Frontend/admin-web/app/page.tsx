import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />
        <h1 className="text-4xl font-bold text-center mt-8">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </div>
    </main>
  )
}
