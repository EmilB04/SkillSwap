

import { PageLayout } from "../../PageLayout";
import SideMenuFlyout from "@/app/components/profile/SideMenuFlyout";
import type { AppContext } from "@/worker";

interface ProfileLayoutProps {
    children: React.ReactNode;
    ctx?: AppContext;
}

export function ProfileLayout({ children, ctx }: ProfileLayoutProps) {
    return (
        <PageLayout ctx={ctx}>
            <div className="flex">
                <SideMenuFlyout />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </PageLayout>
    );
}