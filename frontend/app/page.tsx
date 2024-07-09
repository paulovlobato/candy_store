import UserTable from '../components/UserTable';

// Disable caching to fix annoying invisible bug where table refused get most recent data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
        <UserTable searchParams={searchParams}/>
      </div>
    </div>
  )
}