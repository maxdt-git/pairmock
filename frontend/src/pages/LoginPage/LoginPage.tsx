import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/Footer/Footer";

export default function LoginPage() {
  return (
    <div className="max-w-[1650px] p-2 mx-auto flex min-h-dvh flex-col">
      <main className="flex grow items-center justify-center p-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
