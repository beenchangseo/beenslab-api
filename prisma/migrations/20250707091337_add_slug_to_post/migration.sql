-- AlterTable
ALTER TABLE "post" ADD COLUMN     "slug" TEXT DEFAULT '';

-- CreateIndex
CREATE INDEX "post_slug_idx" ON "post"("slug");
