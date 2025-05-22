import Image from "next/image";

const NoData = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/illustrations/no-data.svg"
          width={300}
          height={300}
          alt="No Data"
        />
        <p className="text-xl font-semibold text-danger">Data not found 😢</p>
      </div>
    </div>
  );
};
export default NoData;
