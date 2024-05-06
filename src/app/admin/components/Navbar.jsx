import ContainerLayout from "@/components/Container";
import Link from "next/link";

const links = [
  { name: "Staking", path: "/admin/staking", active: true },
  { name: "Raffle", path: "/admin/raffle", active: true },
  { name: "Auction", path: "/admin/raffle", active: false },
  { name: "Coin Flip", path: "/admin/raffle", active: false },
];

export const Navbar = () => {
  return (
    <ContainerLayout>
      <div className="flex justify-end w-full mt-5  gap-5">
        {links.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            style={{
              cursor: item.active ? "pointer" : "not-allowed",
              opacity: item.active ? "1" : "0.5",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </ContainerLayout>
  );
};
