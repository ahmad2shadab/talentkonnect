import { Logo } from '@/components/logo';
import { OnboardingForm } from '@/components/onboarding-form';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Logo size="default" />
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <OnboardingForm />
        </div>
      </main>

      <footer className="py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-neutral-dark">
            Want to see your credits?{' '}
            <Link
              href="/dashboard"
              className="text-accent-orange hover:underline"
            >
              Go to Dashboard
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
