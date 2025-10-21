"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";

export default function EditPage({ ctx }: RequestInfo) {
    return (
        <ProfileLayout ctx={ctx}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                <p>Update your profile information here.</p>
            </div>
        </ProfileLayout>
    );
}