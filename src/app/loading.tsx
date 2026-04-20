export function HomeLoading() {
  return (
    <div className="container-max">
      <div className="pt-24 pb-16 flex flex-col gap-4">
        <div className="h-[80px] w-[60%] bg-background-muted rounded-sm" />
        <div className="h-[14px] w-[200px] bg-background-muted rounded-xs" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="pb-16">
          <div className="h-[40px] w-[200px] bg-background-muted rounded-sm mb-6" />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="w-[280px] shrink-0 flex flex-col gap-3">
                <div className="aspect-video bg-background-muted rounded-sm" />
                <div className="h-[16px] bg-background-muted rounded-xs" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeLoading;
