import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import contributingMarkdown from "../../CONTRIBUTING.md?raw";

export const Route = createFileRoute("/docs/contributing")({
	component: ContributingDocsPage,
});

export function ContributingDocsPage() {
	return (
		<main className="page-wrap space-y-8 px-4 pb-18 pt-10 sm:pt-14">
			<section className="space-y-3">
				<p className="eyebrow">Docs</p>
				<h1 className="hero-title max-w-4xl text-[clamp(2.8rem,6vw,4.8rem)]">
					Contributing guide
				</h1>
				<p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
					The gallery renders this page directly from the repository markdown so
					contributors and maintainers work from the same source.
				</p>
			</section>

			<article className="prose prose-invert max-w-none rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--panel)] px-6 py-8 sm:px-10">
				<ReactMarkdown>{contributingMarkdown}</ReactMarkdown>
			</article>
		</main>
	);
}
