import type { JsonLdObject } from '@/lib/schema';

type JsonLdProps = {
  /** Identifier appended to the script tag id — keeps multiple graphs distinct. */
  id: string;
  data: JsonLdObject;
};

/**
 * Emits a structured-data script tag. `JSON.stringify` output is escaped for
 * `</script>` so a stray sequence in content can never break out of the tag.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={`jsonld-${id}`}
      type="application/ld+json"
      // Serialised from typed objects built in lib/schema.ts, not user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
