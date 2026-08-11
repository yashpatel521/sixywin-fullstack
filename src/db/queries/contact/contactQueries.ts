import { getDb } from '@/db';
import { contactMessages } from '@/db/schema';

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function saveContactSubmissionInDb(input: ContactInput) {
  try {
    const database = getDb();
    const inserted = await database
      .insert(contactMessages)
      .values({
        name: input.name.trim(),
        email: input.email.toLowerCase().trim(),
        subject: input.subject.trim(),
        message: input.message.trim(),
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Error saving contact submission in DB:', error);
    throw error;
  }
}
