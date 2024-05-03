-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT (date_part('epoch'::text, now()));
