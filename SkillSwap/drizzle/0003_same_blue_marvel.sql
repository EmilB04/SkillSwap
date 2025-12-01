ALTER TABLE `profile_details` ADD `phone_number` text;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `location` text;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `website` text;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `skills_offered` text;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `skills_learning` text;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `profile_details` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` ADD `category` text NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` ADD `payment` text NOT NULL;--> statement-breakpoint
ALTER TABLE `ads` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `ads` ADD `location` text;--> statement-breakpoint
ALTER TABLE `ads` ADD `date` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `ads_slug_unique` ON `ads` (`slug`);