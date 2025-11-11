import { relations } from "drizzle-orm";
import { directMessages } from "./direct-messages";
import { reviews } from "./reviews";
import { users } from "./users";
import { notifications } from "./notifications";
import { ads } from "./ads";
import { profileDetails } from "./profile-details";

// Relations for users

export const usersRelations = relations(users, ({ many, one }) => ({
    profile: one(profileDetails, {
        fields: [users.id],
        references: [profileDetails.userId],
    }),
    ads: many(ads),
    sentMessages: many(directMessages, { relationName: "sent" }),
    receivedMessages: many(directMessages, { relationName: "recieved" }),
    writtenReviews: many(reviews, { relationName: "reviewer" }),
    receivedReviews: many(reviews, { relationName: "receiver" }),
    notifications: many(notifications),
}));

// Relations for ads

export const adsRelations = relations(ads, ({ one }) => ({
    user: one(users, {
        fields: [ads.userId],
        references: [users.id],
    }),
}));

// Realations for direct messages

export const directMessagesRelations = relations(directMessages, ({ one }) => ({
    sender: one(users, {
        fields: [directMessages.senderId],
        references: [users.id],
        relationName: "sent",     
    }),
    receiver: one(users, {
        fields: [directMessages.receiverId],
        references: [users.id],
        relationName: "received",
    }),
}));

// Relations for profile details

export const profileDetailsRelations = relations(profileDetails, ({ one }) => ({
    user: one(users, {
        fields: [profileDetails.userId],
        references: [users.id],
    }),
}));

// Relations for reviews

export const reviewsRelations = relations(reviews, ({ one }) => ({
    reviewer: one(users, {
        fields: [reviews.reviewerId],
        references: [users.id],
        relationName: "reviewer",
    }),
    receiver: one(users, {
        fields: [reviews.receiverId],
        references: [users.id],
        relationName: "receiver",
    }),
}));

// Relations for notifications

export const notificationsRelations = relations(notifications, ({ one }) => ({
    user: one(users, {
        fields: [notifications.userId],
        references: [users.id],
    }),
}));