/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceCard from "@/components/modules/service/ServiceCard";
import { getAllService } from "@/services/service";

const page = async () => {
  const { data } = await getAllService();
  return (
    <div>
      <div className="grid my-10 grid-cols-4 gap-5">
        {data?.map((s: any) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
};

export default page;
