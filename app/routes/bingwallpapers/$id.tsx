import { Link, MetaFunction, redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { client, Wallpaper } from  "../../../libs/Client";
import { Fragment } from "react";
import Layout from "../../../components/Layout";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return redirect("/")
  }

  const data = await client.getWallpaper(id)
  if (!data.wallpaper) {
    throw new Response("Not Found", { status: 404 });
  }

  return data;
};

export const meta: MetaFunction = ({ data }) => {
  return { title: `${data.wallpaper.title} - Bing Wallpapers` };
};

export default function Index() {
  const data = useLoaderData();

  return (
    <Layout>
      <h1 className="text-3xl mb-2 text-white">Bing Wallpapers</h1>
      <Wallpaper wallpaper={data.wallpaper} />
    </Layout>
  );
}

function intToDate(int) {
  const datePattern = /^(\d{4})(\d{2})(\d{2})$/
  const [, year, month, day] = datePattern.exec(int)
  return `${year}-${month}-${day}`
}

function Wallpaper({ wallpaper }: { wallpaper: Wallpaper }) {
  const { id, filename, title, copyright, date, tags } = wallpaper
  const t = Object.entries(tags).sort((a, b) => b[1] - a[1])
  const tagFields = t.map((l, i) => (
    <Fragment key={i}><Link to={`/bingwallpapers/tags/${l[0]}`}><span className="rounded p-2 leading-10 bg-slate-800 text-white hover:bg-slate-700">{l[0]}</span></Link> </Fragment>
  ))

  return (
    <>
      <figure key={id} className="wallpaper relative">
        <Link to={`/bingwallpapers/${id}`}>
          <a title={title}>
            <img
              src={`https://images.sonurai.com/${filename}.jpg`}
              width={1920}
              height={1200}
              alt={title}
            />
            <figcaption className="caption text-2xl text-white">{title}</figcaption>
          </a>
        </Link>
      </figure>
      <p className="text-gray-400">{copyright} - {intToDate(date)}</p>
      <p className="mt-4">{tagFields}</p>
    </>
  )
}
