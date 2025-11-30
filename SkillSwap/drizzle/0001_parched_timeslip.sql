ALTER TABLE `users` ADD `password_hash` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `is_active` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` integer NOT NULL;