import type { Core } from '@strapi/strapi';

/**
 * Ações da API liberadas para visitantes (role "Public").
 * O frontend lê o conteúdo sem token: se uma ação não estiver aqui, a rota responde 403.
 * Escrita pública só no guestbook (create), com a aprovação controlada no controller.
 */
const PUBLIC_ACTIONS = [
  'api::post.post.find',
  'api::post.post.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::game.game.find',
  'api::game.game.findOne',
  'api::quote.quote.find',
  'api::activity.activity.find',
  'api::featured-image.featured-image.find',
  'api::about-me.about-me.find',
  'api::guestbook-entry.guestbook-entry.find',
  'api::guestbook-entry.guestbook-entry.findOne',
  'api::guestbook-entry.guestbook-entry.create',
];

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[bootstrap] role "public" não encontrada; permissões públicas não aplicadas');
    return;
  }

  const existing = await strapi.db
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id }, select: ['action'] });
  const existingActions = new Set(existing.map((permission) => permission.action));

  const missing = PUBLIC_ACTIONS.filter((action) => !existingActions.has(action));

  // Mesmo padrão que o plugin users-permissions usa internamente
  await Promise.all(
    missing.map((action) =>
      strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } })
    )
  );

  if (missing.length > 0) {
    strapi.log.info(`[bootstrap] permissões públicas adicionadas: ${missing.join(', ')}`);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
  },
};
