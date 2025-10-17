"use client";

import { PageLayout } from "../../PageLayout";
import { RequestInfo } from "rwsdk/worker";

export function MyPage({ ctx }: RequestInfo) {
    return (
        <PageLayout ctx={ctx}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Page</h1>
                <p>Welcome to your profile page!</p>
            </div>
        </PageLayout>
    );
}
