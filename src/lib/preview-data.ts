export const organizations = [
    { id: 'business', display_name: 'Demo AS', kind: 'business', role: 'owner' },
    { id: 'association', display_name: 'Demo forening', kind: 'association', role: 'member' },
    { id: 'empty', display_name: 'Demo 3', kind: 'association', role: 'owner' }
  ];

const subscriptions = [
    { id: 'demo-1', organization: 'business', product: 'Ploos Hosting', provider: 'Ploos', plan: 'Demo Web', status: 'active' },
    { id: 'demo-2', organization: 'business', product: 'Ploos Mail', provider: 'Ploos', plan: 'Starter (5)', status: 'pending' },
    { id: 'demo-3', organization: 'association', product: 'Ploos Cloud', provider: 'Ploos', plan: 'Demo Drive (5)', status: 'suspended' },
    { id: 'demo-4', organization: 'association', product: 'Ploos Hosting', provider: 'Ploos', plan: 'Demo Web', status: 'cancelled' }
  ] as const;

const businessMembers = [
    { name: 'Demo A', role: 'owner' },
    { name: 'Demo B', role: 'admin' },
    { name: 'Demo C', role: 'member' },
    { name: 'Demo D', role: 'viewer' }
  ];
  const associationMembers = [{ name: 'Demo E', role: 'owner' }, { name: 'Demo F', role: 'member' }];

export function subscriptionsFor(id: string) { return subscriptions.filter(item => item.organization === id); }
export function membersFor(id: string) { return id === 'business' ? businessMembers : id === 'association' ? associationMembers : []; }
export function summaryFor(id: string) {
  const items = subscriptionsFor(id);
  return { subscriptions: items.length, active: items.filter(item => item.status === 'active').length, members: membersFor(id).length };
}
