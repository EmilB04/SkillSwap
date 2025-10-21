"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";

export default function SettingsPage({ ctx }: RequestInfo) {
    return (
        <ProfileLayout ctx={ctx}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <p>Manage your account settings here.</p>
            </div>
        </ProfileLayout>
    );
}