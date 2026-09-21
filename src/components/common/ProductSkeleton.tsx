export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] w-full bg-noir-850" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 bg-noir-850" />
        <div className="h-3 w-1/2 bg-noir-850" />
        <div className="h-3 w-1/4 bg-noir-850" />
      </div>
    </div>
  )
}