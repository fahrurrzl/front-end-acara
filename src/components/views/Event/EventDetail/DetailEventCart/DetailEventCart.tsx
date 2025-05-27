import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from "@heroui/react";
import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { CardFooter } from "@heroui/card";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
  onCreateOrder: () => void;
  isLoading: boolean;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity, onCreateOrder, isLoading } =
    props;
  const session = useSession();
  const router = useRouter();

  return (
    <Card className="p-4 lg:sticky lg:top-[80px]">
      {session.status === "authenticated" ? (
        <Fragment>
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
          </CardHeader>
          <CardBody>
            {cart?.ticket === "" ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold">
                    {dataTicketInCart?.name}
                  </h4>
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
                    {convertIDR(
                      Number(dataTicketInCart?.price) * cart?.quantity,
                    )}
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
              disabled={cart.quantity === 0 || isLoading}
              className="cursor-pointer disabled:cursor-no-drop disabled:opacity-30 disabled:hover:opacity-30"
              onPress={onCreateOrder}
            >
              {isLoading ? <Spinner color="white" /> : "Checkout"}
            </Button>
          </CardFooter>
        </Fragment>
      ) : (
        <CardFooter>
          <Button
            size="md"
            color="danger"
            fullWidth
            className="cursor-pointer disabled:cursor-no-drop disabled:opacity-30 disabled:hover:opacity-30"
            as={Link}
            href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
          >
            Login for book ticket
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
export default DetailEventCart;
