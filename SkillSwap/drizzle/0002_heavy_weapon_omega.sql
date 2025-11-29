PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_profile_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`display_name` text,
	`profile_image_url` text,
	`bio` text,
	`phone_number` text,
	`location` text,
	`website` text,
	`skills_offered` text,
	`skills_learning` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_profile_details`("id", "user_id", "display_name", "profile_image_url", "bio", "phone_number", "location", "website", "skills_offered", "skills_learning", "created_at", "updated_at", "deleted_at") SELECT "id", "user_id", "display_name", "profile_image_url", "bio", "phone_number", "location", "website", "skills_offered", "skills_learning", "created_at", "updated_at", "deleted_at" FROM `profile_details`;--> statement-breakpoint
DROP TABLE `profile_details`;--> statement-breakpoint
ALTER TABLE `__new_profile_details` RENAME TO `profile_details`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `profile_details_user_id_unique` ON `profile_details` (`user_id`);