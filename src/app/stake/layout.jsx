import StakingInfo from "@/components/StakingInfo";

export default function StakingLayout({ children }) {
  return (
    <main className="mt-20 flex flex-col-reverse lg:flex-row gap-10">
      {children}
      <StakingInfo />
    </main>
  );
}
