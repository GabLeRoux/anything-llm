const prisma = require("../utils/prisma");

const EmbedChats = {
  new: async function ({ embedId, prompt, response = {}, sessionId }) {
    try {
      const chat = await prisma.embed_chats.create({
        data: {
          prompt,
          embed_id: Number(embedId),
          response: JSON.stringify(response),
          session_id: sessionId,
        },
      });
      return { chat, message: null };
    } catch (error) {
      console.error(error.message);
      return { chat: null, message: error.message };
    }
  },

  forEmbedByUser: async function (
    embedId = null,
    sessionId = null,
    limit = null,
    orderBy = null
  ) {
    if (!embedId || !sessionId) return [];

    try {
      const chats = await prisma.embed_chats.findMany({
        where: {
          embed_id: embedId,
          session_id: sessionId,
        },
        ...(limit !== null ? { take: limit } : {}),
        ...(orderBy !== null ? { orderBy } : { orderBy: { id: "asc" } }),
      });
      return chats;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  // forWorkspace: async function (
  //   workspaceId = null,
  //   limit = null,
  //   orderBy = null
  // ) {
  //   if (!workspaceId) return [];
  //   try {
  //     const chats = await prisma.embed_chats.findMany({
  //       where: {
  //         workspaceId,
  //         include: true,
  //       },
  //       ...(limit !== null ? { take: limit } : {}),
  //       ...(orderBy !== null ? { orderBy } : { orderBy: { id: "asc" } }),
  //     });
  //     return chats;
  //   } catch (error) {
  //     console.error(error.message);
  //     return [];
  //   }
  // },

  // markHistoryInvalid: async function (workspaceId = null, user = null) {
  //   if (!workspaceId) return;
  //   try {
  //     await prisma.embed_chats.updateMany({
  //       where: {
  //         workspaceId,
  //         user_id: user?.id,
  //       },
  //       data: {
  //         include: false,
  //       },
  //     });
  //     return;
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },

  get: async function (clause = {}, limit = null, orderBy = null) {
    try {
      const chat = await prisma.embed_chats.findFirst({
        where: clause,
        ...(limit !== null ? { take: limit } : {}),
        ...(orderBy !== null ? { orderBy } : {}),
      });
      return chat || null;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  delete: async function (clause = {}) {
    try {
      await prisma.embed_chats.deleteMany({
        where: clause,
      });
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  },

  where: async function (
    clause = {},
    limit = null,
    orderBy = null,
    offset = null
  ) {
    try {
      const chats = await prisma.embed_chats.findMany({
        where: clause,
        ...(limit !== null ? { take: limit } : {}),
        ...(offset !== null ? { skip: offset } : {}),
        ...(orderBy !== null ? { orderBy } : {}),
      });
      return chats;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  count: async function (clause = {}) {
    try {
      const count = await prisma.embed_chats.count({
        where: clause,
      });
      return count;
    } catch (error) {
      console.error(error.message);
      return 0;
    }
  },
};

module.exports = { EmbedChats };