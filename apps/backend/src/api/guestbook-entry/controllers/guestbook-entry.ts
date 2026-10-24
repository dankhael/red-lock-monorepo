/**
 * guestbook-entry controller
 *
 * A API pública só expõe mensagens aprovadas, e quem cria uma mensagem
 * não consegue aprová-la. A moderação acontece pelo painel admin
 * (Content Manager), que não passa por este controller.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::guestbook-entry.guestbook-entry', () => ({
  async find(ctx) {
    const filters = (ctx.query.filters as Record<string, unknown>) || {};
    // `approved: true` no nível de cima é combinado com AND com qualquer filtro enviado
    ctx.query = { ...ctx.query, filters: { ...filters, approved: true } };
    return super.find(ctx);
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (!response?.data?.approved) {
      return ctx.notFound();
    }
    return response;
  },

  async create(ctx) {
    const body = ctx.request.body as { data?: Record<string, unknown> } | undefined;
    if (body?.data) {
      delete body.data.approved;
    }
    return super.create(ctx);
  },
}));
