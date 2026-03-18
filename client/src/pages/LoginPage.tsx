import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { useState } from "react";

export default function LoginPage() {
    const imageUrl = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <div className="flex h-dvh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl h-[500px]">
                {!isLogin ? <LoginForm className="h-full" imageUrl={imageUrl} onSwitch={() => setIsLogin(true)} /> : <SignupForm className="h-full" imageUrl={imageUrl} onSwitch={() => setIsLogin(false)} />}
            </div>
        </div>
    )
}
