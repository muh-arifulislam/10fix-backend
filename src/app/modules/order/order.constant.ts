export const ORDER_STATUS = {
  pending: 'pending',
  received: 'received',
  completed: 'completed',
};

export type TOrderStatus = keyof typeof ORDER_STATUS;
