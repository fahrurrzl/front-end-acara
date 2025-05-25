import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { CardFooter } from "@heroui/card";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}
const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity } = props;

  return (
    <Card className="p-4 lg:sticky lg:top-[80px]">
      <CardHeader>
        <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
      </CardHeader>
      <CardBody>
        {cart?.ticket === "" ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold">{dataTicketInCart?.name}</h4>
              <div className="flex items-center gap-2">
                <Button
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-700"
                  variant="bordered"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <span className="text-lg font-bold">{cart?.quantity}</span>
                <Button
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-700"
                  variant="bordered"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">
                {convertIDR(Number(dataTicketInCart?.price) * cart?.quantity)}
              </p>
            </div>
          </div>
        )}
        <Divider className="mt-4" />
      </CardBody>
      <CardFooter>
        <Button
          size="md"
          color="danger"
          fullWidth
          disabled={cart.quantity === 0}
          className="cursor-pointer disabled:cursor-no-drop disabled:opacity-30 disabled:hover:opacity-30"
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DetailEventCart;
