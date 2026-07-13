interface Props {
  params: Promise<{ category: string }>;
}

export default async function ProductCategoryPage({ params }: Props) {
  const { category } = await params;
  return <main data-category={category} />;
}
