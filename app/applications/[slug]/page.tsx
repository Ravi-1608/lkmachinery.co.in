interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  return <main data-slug={slug} />;
}
