import Account from "@/components/Account";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <Account />
      {/* <Link href={"/api/auth/logout"}>Logout</Link> */}
    </main>
  );
}
