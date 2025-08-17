interface EventMap {
  'user.created': { userId: string; email: string };
  'order.completed': { orderId: string; amount: number };
}

class EventEmitter {
  // This Map stores: event name -> array of listener functions
  private listeners: Map<string, Function[]> = new Map();
  
  constructor() {
    // No initialization needed for now
  }
  
  // Try this signature:
  emit<K extends keyof EventMap>(eventName: K, payload: EventMap[K]): void {
    let listner:Function[] | undefined = this.listeners.get(eventName);
    if(listner){
    listner.map((val)=>val(payload))
    }
    
  }

  on<K extends keyof EventMap>(eventName: K, listener: (payload: EventMap[K]) => void): void {
    const existing = this.listeners.get(eventName) ?? [];
    this.listeners.set(eventName, [...existing, listener]);
  }
}
const emitter = new EventEmitter();

emitter.on('user.created', data => {
  console.log(`User created: ${data.userId}, ${data.email}`);
});

emitter.on('order.completed', data => {
  console.log(`Order completed: ${data.orderId}, amount: ${data.amount}`);
});

// ✅ Correct payload required
emitter.emit('user.created', { userId: 'u1', email: 'test@example.com' });
emitter.emit('order.completed', { orderId: 'o1', amount: 500 });
