import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // page bg uses the spec background color, card sits centered
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-2xl px-8 py-10 shadow-lg">
        {children}
      </div>
    </div>
  )
}

