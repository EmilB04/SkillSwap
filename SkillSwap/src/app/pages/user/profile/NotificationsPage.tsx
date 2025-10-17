"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";

export function NotificationsPage({ ctx }: RequestInfo) {
    return (
        <ProfileLayout ctx={ctx}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                <p>Your notifications will appear here.</p>
            </div>
        </ProfileLayout>
    );
}