import { Truck } from "lucide-react";
import React from "react";
import FormField from "@/features/auth/components/FormField";
import Card from "@/components/common/Card";
import {
	FlexContainer,
	GridContainer,
	IconBaseContainer,
} from "@/components/layouts/containers/Container";
import { H3 } from "@/components/common/typography/Headings";
import { TextBody } from "@/components/common/typography/Text";

const DeliveryInformationForm = ({ register, errors }) => {
	return (
		<Card className="p-8">
			{/* Section Header */}
			<div className="mb-8">
				<FlexContainer className="gap-6 mb-4">
					<IconBaseContainer
						margin=""
						className="w-10 h-10 bg-accent/10 border-base-200/30"
					>
						<Truck className="w-5 h-5 text-accent" />
					</IconBaseContainer>
					<H3>Delivery Information</H3>
				</FlexContainer>
				<TextBody>Please provide your delivery details</TextBody>
			</div>

			<div className="space-y-6">
				{/* Name Fields */}
				<GridContainer columns="two" className="md:grid-cols-2 gap-4">
					{[
						{
							label: "First Name",
							name: "firstName",
							validation: { required: "First name is required" },
							placeholder: "Enter your first name",
						},
						{
							label: "Last Name",
							name: "lastName",
							validation: { required: "Last name is required" },
							placeholder: "Enter your Last name",
						},
					].map((item) => (
						<FormField
							label={item.label}
							name={item.name}
							type="text"
							register={register}
							errors={errors}
							validation={item.validation}
							placeholder={item.placeholder}
						/>
					))}
				</GridContainer>

				{[
					{
						label: "Email Address",
						name: "email",
						type: "email",
						validation: {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						},
						placeholder: "Enter your email address",
					},
					{
						label: "Street Address",
						name: "street",
						type: "text",
						validation: {  required: "Street address is required" },
						placeholder: "Enter your street address",
					},
				].map((item) => (
					<FormField
						label={item.label}
						name={item.name}
						type={item.type}
						register={register}
						errors={errors}
						validation={item.validation}
						placeholder={item.placeholder}
					/>
				))}

				{/* City and State */}
				<GridContainer columns="two" className="md:grid-cols-2 gap-4">
					{[
						{
							label: "City",
							name: "city",
							validation: { required: "City name is required" },
							placeholder: "Enter your city name",
						},
						{
							label: "State",
							name: "state",
							validation: { required: "State is required" },
							placeholder: "Enter your State",
						},
					].map((item) => (
						<FormField
							label={item.label}
							name={item.name}
							type="text"
							register={register}
							errors={errors}
							validation={item.validation}
							placeholder={item.placeholder}
						/>
					))}
				</GridContainer>

				{/* Zipcode and Country */}
				<GridContainer columns="two" className="md:grid-cols-2 gap-4">
					{[
						{
							label: "Zipcode",
							name: "zipcode",
							validation: { required: "Zipcode name is required" },
							placeholder: "Enter your zipcode name",
						},
						{
							label: "Country",
							name: "country",
							validation: { required: "Country is required" },
							placeholder: "Enter your country",
						},
					].map((item) => (
						<FormField
							label={item.label}
							name={item.name}
							type="text"
							register={register}
							errors={errors}
							validation={item.validation}
							placeholder={item.placeholder}
						/>
					))}
				</GridContainer>

				{/* Phone Number */}
				<FormField
					label="Phone Number"
					name="phone"
					type="tel"
					register={register}
					errors={errors}
					validation={{
						required: "Phone number is required",
						pattern: {
							value: /^[0-9+\-\s()]+$/,
							message: "Invalid phone number format",
						},
					}}
					placeholder="Enter your phone number"
				/>
			</div>
		</Card>
	);
};

export default DeliveryInformationForm;
