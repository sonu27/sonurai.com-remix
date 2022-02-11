import { Link, redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { client, Wallpaper } from  "../../libs/Client";

const getUrlPrev = (p) => `/?date=${p.date}&id=${p.id}&prev=1`
const getUrlNext = (p) => `/?date=${p.date}&id=${p.id}`

const Pagination = ({ pagination }) => (
  <div className="mt-4 mb-16">
    <Link to={getUrlPrev(pagination.prev)} className="rounded p-2 bg-slate-800 text-white">Prev</Link>
    <Link to={getUrlNext(pagination.next)} className="rounded p-2 bg-slate-800 text-white">Next</Link>
  </div>
)

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get("date")
  const id = url.searchParams.get("id")
  const prev = url.searchParams.get("prev")
  const reverse = (prev === '1')

  if ((date && !id) || (!date && id)) {
    return redirect("/")
  }

  const data = await client.getWallpapers(date, id, reverse)
  if (data.wallpapers.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
};


export default function Index() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mb-2 text-white">Bing Wallpapers</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <Pagination pagination={data.pagination} />
    </div>
  );
}

function WallpaperList({ wallpapers }: { wallpapers: Wallpaper[]}) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-1">
      {wallpapers.map(({ id, title, filename }) => (
        <figure key={id} className="wallpaper relative">
          <Link to={`/bingwallpapers/${id}`}>
            <a title={title}>
              <img
                src={`https://images.sonurai.com/${filename}.jpg`}
                width={1920}
                height={1200}
                alt={title}
              />
              <figcaption className="caption hidden absolute bottom-0 left-0 p-4 h-full w-full text-2xl bg-black bg-opacity-80 text-white">{title}</figcaption>
            </a>
          </Link>
        </figure>
      ))}
    </div>
  )
}
