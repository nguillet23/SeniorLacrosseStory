import { getCollection } from 'astro:content';

const count = (text: string, pattern: RegExp) => text.match(pattern)?.length ?? 0;

/**
 * Prints a build warning (never an error) listing content that is still a placeholder:
 * `<Todo>` blocks, placeholder media and "XX" spec values inside sections, plus any
 * metrics or testimonials marked `status: draft`.
 */
export async function reportDrafts() {
  const lines: string[] = [];
  let total = 0;

  for (const section of await getCollection('sections')) {
    const body = section.body ?? '';
    const todos =
      count(body, /<Todo\b/g) +
      count(body, /kind[:=]\s*["']placeholder["']/g) +
      count(body, /value="XX/g);
    if (todos > 0) {
      lines.push(`  sections/${section.id}: ${todos} placeholder${todos === 1 ? '' : 's'}`);
      total += todos;
    }
  }

  const collections = {
    metrics: await getCollection('metrics'),
    testimonials: await getCollection('testimonials'),
    team: await getCollection('team'),
  };
  for (const [name, entries] of Object.entries(collections)) {
    const drafts = entries.filter((entry) => entry.data.status === 'draft').length;
    if (drafts > 0) {
      lines.push(`  ${name}: ${drafts} draft entr${drafts === 1 ? 'y' : 'ies'}`);
      total += drafts;
    }
  }

  if (total > 0) {
    console.warn(
      `\n[content] ${total} placeholder items still need real content:\n${lines.join('\n')}\n`,
    );
  }
}
