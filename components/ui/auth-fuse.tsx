"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#5B4FFF] text-white hover:bg-[#7B6FFF]",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30",
        secondary: "bg-white/8 text-white/80 hover:bg-white/12",
        ghost: "hover:bg-white/8 text-white/70 hover:text-white",
        link: "text-[#a89dff] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white shadow-sm transition-all placeholder:text-white/30 focus-visible:border-[#5B4FFF]/60 focus-visible:bg-white/8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5B4FFF]/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, label, ...props }, ref) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor={id} className="text-white/70">{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-white/30 transition-colors hover:text-white/70 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

interface AuthContentProps {
  image?: { src: string; alt: string };
  quote?: { text: string; author: string };
}

interface AuthUIProps {
  signInContent?: AuthContentProps;
  signUpContent?: AuthContentProps;
  onSignIn?: (email: string, password: string) => Promise<void>;
  onSignUp?: (name: string, email: string, password: string) => Promise<void>;
  error?: string;
  loading?: boolean;
}

const defaultSignInContent = {
  image: {
    src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png",
    alt: "A beautiful interior design for sign-in",
  },
  quote: {
    text: "Welcome Back! The journey continues.",
    author: "EaseMize UI",
  },
};

const defaultSignUpContent = {
  image: {
    src: "https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png",
    alt: "A vibrant, modern space for new beginnings",
  },
  quote: {
    text: "Create an account. A new chapter awaits.",
    author: "EaseMize UI",
  },
};

export function AuthUI({
  signInContent = {},
  signUpContent = {},
  onSignIn,
  onSignUp,
  error,
  loading,
}: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const finalSignInContent = {
    image: { ...defaultSignInContent.image, ...signInContent.image },
    quote: { ...defaultSignInContent.quote, ...signInContent.quote },
  };
  const finalSignUpContent = {
    image: { ...defaultSignUpContent.image, ...signUpContent.image },
    quote: { ...defaultSignUpContent.quote, ...signUpContent.quote },
  };

  const currentContent = isSignIn ? finalSignInContent : finalSignUpContent;

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSignIn) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    await onSignIn(email, password);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSignUp) return;
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    await onSignUp(name, email, password);
  };

  return (
    <div
      className="w-full min-h-screen md:grid md:grid-cols-2"
      style={{ background: "#000000", color: "#FAFAFA" }}
    >
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear { display: none; }
      `}</style>

      {/* Left — form */}
      <div className="flex h-screen items-center justify-center p-6 md:h-auto md:p-0 md:py-12">
        <div style={{ width: 350 }} className="flex flex-col gap-2">
          {isSignIn ? (
            <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
                <p className="text-sm" style={{ color: "rgba(250,250,250,0.45)" }}>
                  Enter your email below to sign in
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white/70">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
                </div>
                <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="Password" />
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
                <Button type="submit" variant="outline" className="mt-2" disabled={loading}>
                  {loading ? "Signing in…" : "Sign In"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-white">Create an account</h1>
                <p className="text-sm" style={{ color: "rgba(250,250,250,0.45)" }}>
                  Enter your details below to sign up
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="name" className="text-white/70">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white/70">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
                </div>
                <PasswordInput name="password" label="Password" required autoComplete="new-password" placeholder="Password" />
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
                <Button type="submit" variant="outline" className="mt-2" disabled={loading}>
                  {loading ? "Creating…" : "Sign Up"}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-sm" style={{ color: "rgba(250,250,250,0.45)" }}>
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button variant="link" className="pl-1" onClick={toggleForm}>
              {isSignIn ? "Sign up" : "Sign in"}
            </Button>
          </div>

          <div
            className="relative text-center text-sm"
            style={{ color: "rgba(250,250,250,0.3)" }}
          >
            <span
              className="relative z-10 px-2"
              style={{ background: "#000000" }}
            >
              Or continue with
            </span>
            <div
              className="absolute inset-0 top-1/2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            />
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => console.log("UI: Google button clicked")}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
              className="mr-2 h-4 w-4"
            />
            Continue with Google
          </Button>
        </div>
      </div>

      {/* Right — image */}
      <div
        className="hidden md:block relative bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${currentContent.image.src})` }}
        key={currentContent.image.src}
      >
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 100,
            background: "linear-gradient(to top, #000000, transparent)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-2 pb-6">
          <blockquote className="space-y-2 text-center text-white">
            <p className="text-lg font-medium">
              &ldquo;
              <Typewriter
                key={currentContent.quote.text}
                text={currentContent.quote.text}
                speed={60}
              />
              &rdquo;
            </p>
            <cite
              className="block text-sm font-light not-italic"
              style={{ color: "rgba(250,250,250,0.45)" }}
            >
              — {currentContent.quote.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
