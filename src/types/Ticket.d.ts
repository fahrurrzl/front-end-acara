interface ITicket {
  _id?: string;
  name?: string;
  price?: string | number;
  description?: string;
  quantity?: string | number;
  events?: string;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export { ITicket, ICart };
