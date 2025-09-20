import { SignUp } from "@clerk/nextjs"
import Image from "next/image"

export default function SignUpPage() {
    return (
        <div className="h-screen bg-background flex flex-col">
            <main className="flex-1 flex">
                {/* Left Side - Information */}
                <div className="hidden lg:flex lg:w-1/2 relative ">
                    <Image
                        src="/Wavy_Gen-01_Single-07.jpg"
                        alt="ExamChain Logo"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="w-full lg:w-1/2 flex bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">SCOUT</h2>
                        </div>

                        <div className="flex justify-center">
                            <SignUp
                                appearance={{
                                    elements: {
                                        formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                                        card: "bg-card border border-border shadow-lg",
                                        headerTitle: "text-foreground",
                                        headerSubtitle: "text-muted-foreground",
                                        socialButtonsBlockButton: "border border-border hover:bg-accent hover:text-accent-foreground",
                                        formFieldInput: "bg-background border border-input focus:border-ring",
                                        footerActionLink: "text-primary hover:text-primary/80",
                                    },
                                }}
                                redirectUrl="/dashboard"
                                signInUrl="/sign-in"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
