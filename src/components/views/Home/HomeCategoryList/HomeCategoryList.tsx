import { ICategory } from "@/types/Category";
import { Card, CardBody, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface PropTypes {
  categories: ICategory[];
  isLoading: boolean;
}

const HomeCategoryList = (props: PropTypes) => {
  const { categories, isLoading } = props;

  return (
    <section className="mt-4 px-4 lg:mt-8 lg:px-0">
      <h1 className="text-2xl font-bold text-danger">Event By Category</h1>
      <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto p-4 lg:grid-cols-8">
        {!isLoading
          ? categories.map((category) => (
              <Card
                key={category._id}
                as={Link}
                href={`/event?category=${category?._id}`}
              >
                <CardBody className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src={category?.icon as string}
                    alt={category?.name as string}
                    width={100}
                    height={100}
                    className="w-1/2 lg:w-2/3"
                  />
                  <p className="font-semibold text-default-500">
                    {category?.name}
                  </p>
                </CardBody>
              </Card>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-xl" />
            ))}
      </div>
    </section>
  );
};
export default HomeCategoryList;
