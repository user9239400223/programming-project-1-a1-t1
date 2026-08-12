'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  // covers the layout card while auth state loads
  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#09090B] z-50">
      <LoadingSpinner size="lg" />
    </div>
  )

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        toast.error('Invalid email or password')
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* heading — spec: text-2xl bold, centered */}
      <h1 className="text-2xl font-bold text-primary text-center">Welcome!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* email field */}
        <div className="space-y-1.5">
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="Email"
            className={`w-full rounded-md bg-surface-sunken px-3 py-2.5 text-sm text-primary placeholder:text-muted
              focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-surface
              ${errors.email ? 'border border-border-error' : 'border border-border'}`}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* password field — same styling as email */}
        <div className="space-y-1.5">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            placeholder="Password"
            className={`w-full rounded-md bg-surface-sunken px-3 py-2.5 text-sm text-primary placeholder:text-muted
              focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-surface
              ${errors.password ? 'border border-border-error' : 'border border-border'}`}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* sign in button — light fill, dark text (inverted from inputs) */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-surface-alt text-inverse px-4 py-2.5 text-sm font-semibold
            transition-colors hover:bg-[#d4d4d4] disabled:cursor-not-allowed disabled:opacity-50
            focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-surface"
        >
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {/* google sign in — dark fill with border, matches the input style */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-3 rounded-md
          bg-surface-sunken border border-border px-4 py-2.5 text-sm font-semibold text-primary
          transition-colors hover:bg-[#141416]
          focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-surface"
      >
        <Image src="/google-mark.svg" alt="Google" width={18} height={18} />
        Sign in with Google
      </button>

      {/* bottom link — muted text with a bold white link */}
      <p className="text-center text-xs text-muted">
        Create an account{' '}
        <Link
          href="/auth/signup"
          className="font-semibold text-primary underline hover:text-white"
        >
          here
        </Link>
      </p>
    </div>
  )
}
