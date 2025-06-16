import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="default" />
          <nav className="hidden md:flex space-x-6 font-inter font-semibold">
            <Link href="/" className="text-neutral-dark hover:text-accent-orange transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-neutral-dark hover:text-accent-orange transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-neutral-dark hover:text-accent-orange transition-colors">
              About
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Button
              asChild
              variant="outline"
              className="border-primary-blue text-primary-blue hover:bg-primary-blue/10"
            >
              <Link href="/onboarding">Sign Up</Link>
            </Button>
            <Button asChild className="bg-accent-orange hover:bg-accent-orange/90 text-white">
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-primary-blue">SHARE YOUR SKILLS</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-neutral-dark">
              Join TalentKonnect to share your expertise, earn credits, and connect with talented individuals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-6 text-lg"
            >
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12 text-primary-blue">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-neutral-light p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-center mb-3">Share Your Tip</h3>
                <p className="text-center">Share your expertise in cooking, studying, repairs, or other skills.</p>
              </div>
              <div className="bg-neutral-light p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-center mb-3">Earn Credits</h3>
                <p className="text-center">Get rewarded with credits for your valuable contributions.</p>
              </div>
              <div className="bg-neutral-light p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-center mb-3">Connect & Grow</h3>
                <p className="text-center">Use your credits to connect with other talented individuals.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary-blue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="small" />
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-neutral-light">
                © {new Date().getFullYear()} TalentKonnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
