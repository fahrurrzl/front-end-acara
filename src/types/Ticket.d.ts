interface ITicket {
  _id?: string;
  name?: string;
  price?: string | number;
  description?: string;
  quantity?: string | number;
  events?: string;
}

export { ITicket };
