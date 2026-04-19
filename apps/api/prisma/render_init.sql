-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."FunnelStage" AS ENUM ('NEW', 'BOT_STARTED', 'MINIAPP_OPENED', 'QUIZ_STARTED', 'QUIZ_COMPLETED', 'RECOMMENDATIONS_VIEWED', 'PROPERTY_VIEWED', 'LEAD_CAPTURED', 'CRM_SYNCED');

-- CreateEnum
CREATE TYPE "public"."LeadStatus" AS ENUM ('NEW', 'SENT_TO_CRM', 'IN_PROGRESS', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "public"."ApplicationType" AS ENUM ('PROPERTY_REQUEST', 'CONSULTATION', 'CURATED_SELECTION');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TelegramProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "languageCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "telegramProfileId" TEXT,
    "source" TEXT,
    "utmSource" TEXT,
    "utmCampaign" TEXT,
    "funnelStage" "public"."FunnelStage" NOT NULL DEFAULT 'NEW',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuizAnswer" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionKey" TEXT NOT NULL,
    "answerValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT,
    "address" TEXT,
    "priceFrom" DECIMAL(14,2),
    "priceTo" DECIMAL(14,2),
    "pricePerM2" DECIMAL(14,2),
    "currency" TEXT DEFAULT 'RUB',
    "areaFrom" DECIMAL(10,2),
    "areaTo" DECIMAL(10,2),
    "areaText" TEXT,
    "flatCount" INTEGER,
    "deadlineText" TEXT,
    "objectType" TEXT,
    "developerName" TEXT,
    "mortgageText" TEXT,
    "installmentText" TEXT,
    "promoText" TEXT,
    "badgesJson" JSONB,
    "isSoon" BOOLEAN NOT NULL DEFAULT false,
    "seaDistanceM" INTEGER,
    "parkingJson" JSONB,
    "territoryText" TEXT,
    "ceilingHeight" DECIMAL(6,2),
    "serviceCostPerM2" DECIMAL(10,2),
    "gasText" TEXT,
    "heatingText" TEXT,
    "electricityText" TEXT,
    "canalizationText" TEXT,
    "waterText" TEXT,
    "propertyType" TEXT,
    "status" TEXT,
    "description" TEXT,
    "descriptionExtra" TEXT,
    "purchaseOptionsJson" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PropertyMedia" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PropertyMetric" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rentalYield" DECIMAL(5,2),
    "shortTermYield" DECIMAL(5,2),
    "annualGrowth" DECIMAL(5,2),
    "roi5y" DECIMAL(7,2),
    "roi10y" DECIMAL(7,2),
    "alternativeTotal" DECIMAL(14,2),
    "payloadJson" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lead" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "regionInterest" TEXT,
    "budgetRange" TEXT,
    "purchaseTerm" TEXT,
    "source" TEXT,
    "crmId" TEXT,
    "status" "public"."LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "applicationType" "public"."ApplicationType" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramProfile_telegramId_key" ON "public"."TelegramProfile"("telegramId");

-- CreateIndex
CREATE INDEX "TelegramProfile_userId_idx" ON "public"."TelegramProfile"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- CreateIndex
CREATE INDEX "Session_telegramProfileId_idx" ON "public"."Session"("telegramProfileId");

-- CreateIndex
CREATE INDEX "Session_funnelStage_idx" ON "public"."Session"("funnelStage");

-- CreateIndex
CREATE INDEX "QuizAnswer_sessionId_idx" ON "public"."QuizAnswer"("sessionId");

-- CreateIndex
CREATE INDEX "QuizAnswer_userId_idx" ON "public"."QuizAnswer"("userId");

-- CreateIndex
CREATE INDEX "QuizAnswer_questionKey_idx" ON "public"."QuizAnswer"("questionKey");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "public"."Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "public"."Property"("slug");

-- CreateIndex
CREATE INDEX "Property_regionId_idx" ON "public"."Property"("regionId");

-- CreateIndex
CREATE INDEX "Property_isActive_idx" ON "public"."Property"("isActive");

-- CreateIndex
CREATE INDEX "Property_priceFrom_idx" ON "public"."Property"("priceFrom");

-- CreateIndex
CREATE INDEX "PropertyMedia_propertyId_idx" ON "public"."PropertyMedia"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyMetric_propertyId_key" ON "public"."PropertyMetric"("propertyId");

-- CreateIndex
CREATE INDEX "Lead_userId_idx" ON "public"."Lead"("userId");

-- CreateIndex
CREATE INDEX "Lead_sessionId_idx" ON "public"."Lead"("sessionId");

-- CreateIndex
CREATE INDEX "Lead_crmId_idx" ON "public"."Lead"("crmId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "public"."Lead"("status");

-- CreateIndex
CREATE INDEX "Application_leadId_idx" ON "public"."Application"("leadId");

-- CreateIndex
CREATE INDEX "Application_propertyId_idx" ON "public"."Application"("propertyId");

-- CreateIndex
CREATE INDEX "Event_userId_idx" ON "public"."Event"("userId");

-- CreateIndex
CREATE INDEX "Event_sessionId_idx" ON "public"."Event"("sessionId");

-- CreateIndex
CREATE INDEX "Event_eventName_idx" ON "public"."Event"("eventName");

-- AddForeignKey
ALTER TABLE "public"."TelegramProfile" ADD CONSTRAINT "TelegramProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_telegramProfileId_fkey" FOREIGN KEY ("telegramProfileId") REFERENCES "public"."TelegramProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuizAnswer" ADD CONSTRAINT "QuizAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuizAnswer" ADD CONSTRAINT "QuizAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyMedia" ADD CONSTRAINT "PropertyMedia_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyMetric" ADD CONSTRAINT "PropertyMetric_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

