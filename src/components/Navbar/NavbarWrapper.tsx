import { cookies } from "next/headers";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies()
  if(cookieStore){
    const role = cookieStore.get("role")?.value;
    // console.log(role,"role")
    return <Navbar role={role} />;

  }
  return <></>
}
