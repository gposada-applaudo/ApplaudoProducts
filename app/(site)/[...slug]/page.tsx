import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyPage } from "@/components/site/empty-page";
import { getPageByPath, SITE_PAGES } from "@/content/site-map";

interface CorporatePageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_PAGES.filter((page) => page.path !== "/").map((page) => ({
    slug: page.path.slice(1).split("/"),
  }));
}

export async function generateMetadata({ params }: CorporatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByPath(`/${slug.join("/")}`);
  return page ? { title: `${page.title} | Applaudo` } : {};
}

export default async function CorporatePage({ params }: CorporatePageProps) {
  const { slug } = await params;
  const page = getPageByPath(`/${slug.join("/")}`);
  if (!page) notFound();
  return <EmptyPage title={page.title} />;
}

