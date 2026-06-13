-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "phone" TEXT,
    "image" TEXT,
    "gender" TEXT NOT NULL DEFAULT 'UNSET',
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'GUEST',
    "points" INTEGER NOT NULL DEFAULT 0,
    "grade" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "grade", "id", "image", "name", "passwordHash", "phone", "points", "role", "updatedAt") SELECT "createdAt", "email", "emailVerified", "grade", "id", "image", "name", "passwordHash", "phone", "points", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
