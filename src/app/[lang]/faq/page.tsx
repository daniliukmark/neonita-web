import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { useTranslation } from "@/app/i18n";

export default async function FAQPage(p: { params: { lang: string } }) {
	const { t } = await useTranslation(p.params.lang, "faq-page", {});
	return (
		<main className="flex flex-col justify-between items-center px-8 sm:px-24 pt-24">
			<div className="w-full max-w-2xl">
				<h1 className="pb-2 font-semibold text-5xl">{t("header")}</h1>
				<p
					className="text-light text-sm text-stone-300"
					dangerouslySetInnerHTML={{ __html: t("desc") }}
				/>

				<div className="flex flex-col items-center">
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
							<AccordionContent className="text-light text-stone-300">
								<div dangerouslySetInnerHTML={{ __html: t("faq.a1") }} />
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
							<AccordionContent className="text-light text-stone-300">
								{t("faq.a2")}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
							<AccordionContent className="text-light text-stone-300">
								{t("faq.a3")}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</main>
	);
}
