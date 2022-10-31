import { Fragment } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { client } from  "../../../libs/Client";
import Layout from "../../../components/Layout";
import { intToDate } from '../../../libs/date'

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
  const { id, filename, title, copyright, date, tags } = data.wallpaper;
  const t = Object.entries(tags).sort((a: any, b: any) => b[1] - a[1])
  const tagFields = t.map((l, i) => (
    <Fragment key={i}><Link to={`/bingwallpapers/tags/${l[0]}`} className="leading-10 whitespace-nowrap px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">{l[0]}</Link> </Fragment>
  ))

  return (
    <Layout>
      <Link to={`/bingwallpapers/${id}`} title={title}>
        <img
          className="img-fluid"
          src={`https://images.sonurai.com/${filename}.jpg`}
          width={1920}
          height={1200}
          alt={title}
        />
      </Link>
      <h1 className="caption text-2xl text-white mx-2 md:mx-0">{title}</h1>
      <p className="text-gray-400 mx-2 md:mx-0">{copyright} - {intToDate(date)}</p>
      <p className="mt-2 mx-2 md:mx-0">{tagFields}</p>
    </Layout>
  );
}
