import { cookies } from "next/headers";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies()
  if(cookieStore){
    const role = cookieStore.get("role")?.value;
  
    return <Navbar role={role} />;

  }
  return <></>
}
