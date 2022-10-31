import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { client } from  "../../libs/Client";
import Layout from "../../components/Layout";
import WallpaperList from "../../components/WallpaperList";

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
    <Layout>
      <h1 className="text-3xl mb-2 text-white mx-2 md:mx-0">Bing Wallpapers</h1>
      <WallpaperList wallpapers={data.wallpapers} />
      <Pagination pagination={data.pagination} />
    </Layout>
  );
}

function Pagination({ pagination }: any) {
  const getUrlPrev = (p: any) => `/?date=${p.date}&id=${p.id}&prev=1`
  const getUrlNext = (p: any) => `/?date=${p.date}&id=${p.id}`
  return (
    <div className="my-4 mx-2 md:mx-0">
      <Link to={getUrlPrev(pagination.prev)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">Prev</Link>
      <Link to={getUrlNext(pagination.next)} className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white ml-1">Next</Link>
    </div>
  )
}
