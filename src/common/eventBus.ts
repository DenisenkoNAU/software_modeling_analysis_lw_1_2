import mitt from 'mitt';

type Events = {
  showNotification: { message: string };
};

export const eventBus = mitt<Events>();