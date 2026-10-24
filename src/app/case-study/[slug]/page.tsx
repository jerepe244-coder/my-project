import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projects } from '@/data/projects';
import { CaseStudyClient } from '@/components/case-study/CaseStudyClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found — ZYRVAE Digital Studio',
    };
  }

  return {
    title: `${project.title} — Case Study | ZYRVAE Digital Studio`,
    description: `${project.tagline.en} | ${project.tagline.es}`,
    openGraph: {
      title: `${project.title} — Case Study | ZYRVAE`,
      description: project.tagline.en,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
