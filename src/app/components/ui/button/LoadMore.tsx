import { Button } from "@/src/app/components/ui/button/Button";

interface LoadMoreProps {
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

export const LoadMore = ({ onLoadMore, loading }: LoadMoreProps) => {
  return (
    <div
      data-animate
      data-animate-delay="1.5"
      className="flex justify-center my-8 opacity-0"
    >
      <Button onClick={onLoadMore} disabled={loading} className=" w-[125px]">
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
};
