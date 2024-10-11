import {pgTable, serial, primaryKey, text, varchar, json, integer} from 'drizzle-orm/pg-core'
 
export const StoryData = pgTable("StoryData", {
    id: serial("id").primaryKey(),
    storyID: varchar("storyID").notNull(),
    storySubject: text("storySubject").notNull(),
    storyType: varchar("storyType").notNull(),
    ageGroup: varchar("ageGroup").notNull(),
    output: json("output"),
    userEmail: varchar("userEmail").notNull(),
    userName: varchar('userName').notNull(),
})

export const User = pgTable("User", {
    id: serial("id").primaryKey(),
    userName: varchar("userName").notNull(),
    userEmail: varchar("userEmail").notNull(),
    credit: integer("credit").default(7),
})