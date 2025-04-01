import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Info</h1>
        <p className="w-full text-sm text-default-400">
          Manage info of this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <p className="text-sm font-medium text-default-700">Current Icon</p>
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Input
              name="name"
              type="text"
              label="Name"
              variant="bordered"
              defaultValue={dataCategory?.name}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Textarea
              name="description"
              label="Description"
              variant="bordered"
              defaultValue={dataCategory?.description}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
