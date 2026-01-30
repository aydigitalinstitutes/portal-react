-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "topics" TEXT[],
    "duration" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT,
    "title" TEXT,
    "subtitle" TEXT,
    "icon" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Course_category_idx" ON "Course"("category");

-- CreateIndex
CREATE INDEX "ContentItem_section_idx" ON "ContentItem"("section");
