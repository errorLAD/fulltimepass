-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "questionText" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "answerOptions" JSONB NOT NULL,
    "scoringConfig" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultTemplate" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "resultTitle" TEXT NOT NULL,
    "resultDescription" TEXT NOT NULL,
    "scoreMin" INTEGER,
    "scoreMax" INTEGER,
    "tag" TEXT,
    "templateVars" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolEvent" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyToolStats" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "opens" INTEGER NOT NULL DEFAULT 0,
    "completions" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyToolStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");

-- CreateIndex
CREATE INDEX "Tool_slug_idx" ON "Tool"("slug");

-- CreateIndex
CREATE INDEX "Tool_category_idx" ON "Tool"("category");

-- CreateIndex
CREATE INDEX "Question_toolId_idx" ON "Question"("toolId");

-- CreateIndex
CREATE INDEX "ResultTemplate_toolId_idx" ON "ResultTemplate"("toolId");

-- CreateIndex
CREATE INDEX "ResultTemplate_scoreMin_scoreMax_idx" ON "ResultTemplate"("scoreMin", "scoreMax");

-- CreateIndex
CREATE INDEX "ToolEvent_toolId_eventType_idx" ON "ToolEvent"("toolId", "eventType");

-- CreateIndex
CREATE INDEX "ToolEvent_createdAt_idx" ON "ToolEvent"("createdAt");

-- CreateIndex
CREATE INDEX "DailyToolStats_toolId_idx" ON "DailyToolStats"("toolId");

-- CreateIndex
CREATE INDEX "DailyToolStats_date_idx" ON "DailyToolStats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyToolStats_toolId_date_key" ON "DailyToolStats"("toolId", "date");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultTemplate" ADD CONSTRAINT "ResultTemplate_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolEvent" ADD CONSTRAINT "ToolEvent_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyToolStats" ADD CONSTRAINT "DailyToolStats_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
