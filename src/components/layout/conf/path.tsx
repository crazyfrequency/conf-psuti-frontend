import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { locales } from '@/constants/i18n.constants';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useConfContext } from './conf-context';

export default function Path({
  className,
  ...props
}: Readonly<
  React.HTMLAttributes<HTMLDivElement>
>) {
  const segments = usePathname().split('/').filter(Boolean);
  const { data, isLoading } = useConfContext();
  const t = useScopedI18n('confs');
  const locale = useCurrentLocale();

  if (isLoading) return (
    <Breadcrumb className='m-5 mt-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Skeleton className='h-5 w-20' />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className='h-5 w-20' />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className='h-5 w-20' />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Skeleton className='h-5 w-20' />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  if ((locales as readonly string[]).includes(segments[0]))
    segments.shift();

  const [slug, sub_path, ...rest] = segments;

  const year = new Date(data.startDate).getFullYear();

  const title = data.isEnglishEnabled && locale === 'en'
    ? data.conferenceNameEn
    : data.conferenceNameRu;

  const path_data = data.paths?.find(v=>v.url===sub_path);

  const path_title = path_data
    ? locale === 'en' && path_data.titleEn
      ? path_data.titleEn ?? path_data.titleRu
      : path_data.titleRu
    : t('pages.info');

  return (
    <Breadcrumb className='m-5 mt-2'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>{t('pages.home')}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/confs/${year}`}>{year}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className='truncate max-w-60' href={`/${slug}`}>{title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='truncate max-w-60'>
            {path_title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
