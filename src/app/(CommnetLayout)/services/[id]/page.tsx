import ServiceDetails from "@/components/modules/service/ServiceDetails";
import { getUser } from "@/services/auth";
import { getSingleService } from "@/services/service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const { id } = await params;
  const { data } = await getSingleService(id);

  return (
    <div>
      <ServiceDetails service={data} user={user} />
    </div>
  );
}
