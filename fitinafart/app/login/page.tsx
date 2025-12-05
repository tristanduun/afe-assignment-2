import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img src="/logo.png" alt="FitInAFart" width={180} height={140} className="mb-4" />
      <LoginForm />
    </div>
  );
}