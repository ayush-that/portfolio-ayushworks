import { defineConfig } from "tinacms";

// Local-only editing: run `bun dev` (wraps `tinacms dev`), edit at /admin, commit.
// Media is stored on Cloudflare R2 (S3-compatible) and served from cdn.ayushworks.com.
export default defineConfig({
  branch: "",
  clientId: "",
  token: "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore;
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: { dateFormat: "YYYY-MM-DD" },
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "image",
            name: "cover",
            label: "Cover",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Tweet",
                label: "Tweet",
                fields: [{ type: "string", name: "id", label: "Tweet ID" }],
              },
            ],
          },
        ],
      },
    ],
  },
});
