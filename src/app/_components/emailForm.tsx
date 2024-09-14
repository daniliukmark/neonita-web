"use client";

import { Button } from "./ui/Button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
	messageBody: z.string().max(5000),
});

const EmailForm = () => {
	const { t } = useTranslation("email-form");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			messageBody: "",
		},
	});
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		const subject = "Custom Neon Sign Inquiry.";
		window.open(
			`mailto:signs@neonita.com?subject=${subject}&body=${values.messageBody}`,
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="messageBody"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="h-64 resize-none"
									placeholder={t("form.placeholder")}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>

				<div className="flex justify-end mt-auto w-full">
					<Button className="mt-4" size={"lg"} type="submit">
						{t("form.submitButton")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default EmailForm;
