export const metadata = {
  title: 'About',
  description: 'About this project',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This is the Garage Boilerplate project — a Next.js + Firebase starter
        for RMIT capstone projects. Built with TypeScript, Tailwind CSS, and
        Firebase Authentication &amp; Firestore.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Tech Stack</h2>
      <ul className="mt-3 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
        <li>Next.js 16 (App Router)</li>
        <li>React 19 &amp; TypeScript 5</li>
        <li>Tailwind CSS v4</li>
        <li>Firebase Auth &amp; Firestore</li>
        <li>pnpm workspaces</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Project Info</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        COSC2408 Programming Project 1 — Assignment 1, Task 1: Development
        Boilerplate Setup.
      </p>
    </div>
  )
}
