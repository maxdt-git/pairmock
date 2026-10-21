-- CreateTable
CREATE TABLE "AvailableCard" (
    "id" SERIAL NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "AvailableCard_pkey" PRIMARY KEY ("id")
);
