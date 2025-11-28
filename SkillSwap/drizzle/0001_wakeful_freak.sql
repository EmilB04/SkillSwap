ALTER TABLE `ads` ADD `slug` text NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE `ads` ADD `category` text NOT NULL DEFAULT 'Other';--> statement-breakpoint
ALTER TABLE `ads` ADD `payment` text NOT NULL DEFAULT 'Negotiable';--> statement-breakpoint
ALTER TABLE `ads` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `ads` ADD `location` text;--> statement-breakpoint
ALTER TABLE `ads` ADD `date` integer;