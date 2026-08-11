'use server';

import { saveContactSubmissionInDb, ContactInput } from '@/db/queries/contact/contactQueries';

export async function submitContactFormAction(input: ContactInput) {
  try {
    if (!input.name || !input.email || !input.subject || !input.message) {
      return { success: false, error: 'All fields are required.' };
    }

    const saved = await saveContactSubmissionInDb(input);
    return {
      success: true,
      message: 'Thank you for reaching out! Our team will respond within 24 hours.',
      submissionId: saved.id,
    };
  } catch (error: any) {
    console.error('Error in submitContactFormAction:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit contact message.',
    };
  }
}
