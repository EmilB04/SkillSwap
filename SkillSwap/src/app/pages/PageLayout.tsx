import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { type ReactNode } from "react";
import type { AppContext } from "@/worker";

interface PageLayoutProps {
    children: ReactNode;
    ctx?: AppContext;
}

export function PageLayout({ children, ctx }: PageLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header ctx={ctx} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
