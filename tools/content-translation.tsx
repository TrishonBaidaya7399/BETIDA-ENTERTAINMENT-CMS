import { useEffect, useState } from "react";
import { Box, Button, Card, Checkbox, Flex, Stack, Text } from "@sanity/ui";
import { useSchema } from "sanity";

type SchemaItem = {
  name: string;
  title?: string;
};

export default function ContentTranslationTool() {
  const schema = useSchema();

  const [schemas, setSchemas] = useState<SchemaItem[]>([]);
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  /* Fetch all DOCUMENT schemas (CORRECT) */
  useEffect(() => {
    try {
      const documentSchemas = schema
        .getTypeNames()
        .map((name) => schema.get(name))
        .filter((type: any) => type?.type?.name === "document");

      setSchemas(
        documentSchemas.map((s: any) => ({
          name: s.name,
          title: s.title || s.name,
        }))
      );
    } catch (err) {
      console.error(err);
      setStatus("Failed to load schemas");
    }
  }, [schema]);

  /* Toggle schema selection */
  function toggleSchema(schemaName: string) {
    setSelectedSchemas((prev) =>
      prev.includes(schemaName)
        ? prev.filter((s) => s !== schemaName)
        : [...prev, schemaName]
    );
  }

  /* Trigger DRY RUN translation */
  async function handleTranslate() {
    if (!selectedSchemas.length) {
      setStatus("Please select at least one schema.");
      return;
    }

    setLoading(true);
    setStatus("Dry run started...");

    try {
      await fetch(
        `${process.env.SANITY_STUDIO_TRANSLATION_API}/api/translate-all`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schemas: selectedSchemas,
            dryRun: true,
          }),
        }
      );

      setStatus("Dry run completed. No data was modified. Check backend logs.");
    } catch (err) {
      setStatus("Failed to start translation dry run.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box padding={4}>
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Text size={2} weight="bold">
            Content Translation (Dry Run)
          </Text>

          <Text size={1} muted>
            Select which schemas should be included in the translation dry run.
            No content will be modified.
          </Text>

          <Box
            style={{
              maxHeight: 300,
              overflowY: "auto",
              border: "1px solid var(--card-border-color)",
              padding: 12,
            }}
          >
            <Stack space={3}>
              {schemas.map((s) => (
                <Flex key={s.name} align="center" gap={3}>
                  <Checkbox
                    checked={selectedSchemas.includes(s.name)}
                    onChange={() => toggleSchema(s.name)}
                  />
                  <Text size={1}>
                    {s.title} ({s.name})
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>

          <Button
            tone="primary"
            text={loading ? "Running dry run..." : "Run Translation Dry Run"}
            loading={loading}
            disabled={loading}
            onClick={handleTranslate}
          />

          {status && <Text size={1}>{status}</Text>}
        </Stack>
      </Card>
    </Box>
  );
}
