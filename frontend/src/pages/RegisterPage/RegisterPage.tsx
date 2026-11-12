import BrandHero from "@/components/auth/BrandHero";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/layout/Footer/Footer";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function RegisterPage() {
  return (
    <div className="max-w-[1650px] p-2 mx-auto flex min-h-dvh flex-col">
      <header className="flex justify-between items-center border-b border-border py-2 px-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <img src="/favicon.svg" alt="PairMock logo" className="size-8 shrink-0" />
          <span>PairMock</span>
        </div>
        <ModeToggle />
      </header>
      <main className="flex grow flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4">
        <BrandHero />
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
