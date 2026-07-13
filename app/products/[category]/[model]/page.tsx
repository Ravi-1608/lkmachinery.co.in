interface Props {
  params: Promise<{ category: string; model: string }>;
}

export default async function ProductModelPage({ params }: Props) {
  const { category, model } = await params;
  return <main data-category={category} data-model={model} />;
}
