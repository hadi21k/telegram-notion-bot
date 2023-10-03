const linkDatabaseSchema = (page_id) => {
  return {
    parent: {
      type: "page_id",
      page_id,
    },
    icon: {
      type: "emoji",
      emoji: "🔗",
    },
    cover: {
      type: "external",
      external: {
        url: "https://website.domain/images/link.png",
      },
    },
    title: [
      {
        type: "text",
        text: {
          content: "Useful Links",
          link: null,
        },
      },
    ],
    properties: {
      Title: {
        title: {},
      },
      Category: {
        select: {},
      },
      URL: {
        url: {},
      },
      AddedAt: {
        date: {},
      },
    },
  };
};

const linkPageSchema = (database_id, title, category, url) => {
  return {
    parent: {
      type: "database_id",
      database_id,
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Category: {
        select: {
          name: category,
        },
      },
      URL: {
        url,
      },
      AddedAt: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  };
};

module.exports = {
  linkDatabaseSchema,
  linkPageSchema,
};
