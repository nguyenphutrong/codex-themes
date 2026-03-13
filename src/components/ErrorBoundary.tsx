import { Component, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-[200px] items-center justify-center p-8">
					<div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] p-6 text-center">
						<h2 className="mb-2 text-lg font-semibold text-[color:var(--text)]">
							Something went wrong
						</h2>
						<p className="mb-4 text-sm text-[color:var(--text-soft)]">
							{this.state.error?.message || "An unexpected error occurred"}
						</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="rounded-full border border-[color:var(--line)] bg-[color:var(--accent-strong)] px-4 py-2 text-sm font-medium text-[color:var(--accent-ink)] hover:brightness-105"
						>
							Reload page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
