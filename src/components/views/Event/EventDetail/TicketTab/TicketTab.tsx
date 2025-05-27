import { ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Chip,
  Tooltip,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { ICart } from "@/types/Ticket";

interface PropTypes {
  tickets: ITicket[];
  cart: ICart;
  handleAddToCart: (ticket: string) => void;
}
const TicketTab = ({ tickets, cart, handleAddToCart }: PropTypes) => {
  const session = useSession();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-semibold">Ticket</h2>
      {tickets?.map((ticket) => (
        <Card key={ticket._id} className="mb-4 p-2 lg:p-4">
          <Accordion>
            <AccordionItem
              key={ticket._id}
              aria-label={ticket.name}
              className="border-b-2 border-dashed"
              title={
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{ticket?.name}</h3>
                  {Number(ticket?.quantity) > 0 ? (
                    <Chip size="sm" variant="bordered" color="success">
                      Available
                    </Chip>
                  ) : (
                    <Chip size="sm" variant="faded" color="danger">
                      Sold Out
                    </Chip>
                  )}
                </div>
              }
            >
              {ticket?.description}
            </AccordionItem>
          </Accordion>
          <div className="flex w-full items-center justify-between px-2 py-4">
            <p className="text-xl font-semibold text-default-800">
              {convertIDR(ticket?.price as number)}
            </p>
            <Tooltip
              content={
                session.status !== "authenticated"
                  ? "Login for book ticket"
                  : Number(ticket?.quantity) <= 0
                    ? "Ticket Sold Out"
                    : "Add To Cart"
              }
              color={
                session.status !== "authenticated"
                  ? "default"
                  : Number(ticket?.quantity) <= 0
                    ? "danger"
                    : "warning"
              }
            >
              <Button
                variant="bordered"
                color="warning"
                className="disabled:cursor-no-drop disabled:opacity-30 disabled:hover:opacity-30"
                disabled={
                  Number(ticket?.quantity) <= 0 ||
                  session.status !== "authenticated" ||
                  cart?.ticket === ticket._id
                }
                onPress={() => handleAddToCart(ticket._id as string)}
              >
                Add To Cart
              </Button>
            </Tooltip>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default TicketTab;
