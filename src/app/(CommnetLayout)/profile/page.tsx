import { getProfile } from "@/services/profile";

const page = async () => {
  const { data } = await getProfile();
  console.log(data);
  return <div></div>;
};

export default page;
