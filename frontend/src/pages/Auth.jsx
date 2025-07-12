import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { ShoppingBag, User, Mail, ChevronRight } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import GradientBackground from "@/components/layouts/containers/Gradients";
import { SectionHeader } from "@/components/common/Headers";
import Card, { CardContent } from "@/components/common/Card";
import { H4 } from "@/components/common/typography/Headings";
import PasswordField from "@/features/auth/components/PasswordField";
import FormField from "@/features/auth/components/FormField";
import Button from "@/components/common/Buttons";

const Login = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const { handleLogin, handleRegister, isLoading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = useCallback(
		async (data) => {
			try {
				const authHandler = isSignUp ? handleRegister : handleLogin;
				await authHandler(data);
			} catch (error) {
				console.error("Authentication error:", error);
			}
		},
		[isSignUp, handleLogin, handleRegister]
	);

	const toggleAuthMode = useCallback(() => {
		setIsSignUp((prev) => !prev);
		reset();
	}, [reset]);

	const authModeText = {
		heading: isSignUp ? "Create Account" : "Welcome Back",
		description: isSignUp
			? "Join us and start shopping today"
			: "Sign in to continue shopping",
		submitButton: isSignUp ? "Create Account" : "Sign In",
		togglePrompt: isSignUp
			? "Already have an account?"
			: "Don't have an account?",
		toggleAction: isSignUp ? "Sign In" : "Create Account",
	};

	return (
		<GradientBackground className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<SectionHeader
					label={<ShoppingBag className="w-8 h-8 text-primary" />}
					heading={authModeText.heading}
					description={authModeText.description}
					variant="small"
				/>

				<Card>
					<CardContent padding="large">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<H4>{isSignUp ? "Register" : "Login"}</H4>

							{isSignUp && (
								<FormField
									icon={<User className="w-4 h-4" />}
									label="Full Name"
									type="text"
									name="name"
									register={register}
									errors={errors}
									validation={{
										required: isSignUp ? "Name is required" : false,
										minLength: {
											value: 2,
											message: "Name must be at least 2 characters",
										},
									}}
									placeholder="Enter your full name"
								/>
							)}

							<FormField
								icon={<Mail className="w-4 h-4" />}
								label="Email Address"
								type="email"
								name="email"
								register={register}
								errors={errors}
								validation={{
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								}}
								placeholder="Enter your email"
							/>

							<PasswordField register={register} errors={errors} />

							{!isSignUp && (
								<div className="text-right">
									<Button variant="link" type="button">
										Forgot Password?
									</Button>
								</div>
							)}

							<Button
								type="submit"
								disabled={isLoading}
								className={
									"btn-block disabled:opacity-50 disabled:cursor-not-allowed"
								}
							>
								{isLoading ? (
									<div className="flex items-center gap-2">
										<span className="loading loading-spinner loading-sm"></span>
										Processing...
									</div>
								) : (
									<>
										{authModeText.submitButton}
										<ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</>
								)}
							</Button>

							<div className="divider text-base-content/60">
								<p className="text-base-content/80">
									{authModeText.togglePrompt}
									<Button type="button" action={toggleAuthMode} variant="link">
										{authModeText.toggleAction}
									</Button>
								</p>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</GradientBackground>
	);
};

export default Login;
