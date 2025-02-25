import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { locales } from '@/constants/i18n.constants';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useConfContext } from './conf-context';

const admin_pages = ['settings', 'pages', 'admins', 'form', 'topics', 'mailing'] as const;

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

  const isEdit = rest[rest.length - 1] === 'edit';

  const year = new Date(data.startDate).getFullYear();

  const title = data.isEnglishEnabled && locale === 'en'
    ? data.conferenceNameEn
    : data.conferenceNameRu;

  const path_data = data.pages?.find(v=>v.path === sub_path);

  const path_title = !sub_path || sub_path === 'info'
    ? t('pages.info')
    : path_data
      ? locale === 'en' && path_data.pageNameEn
        ? path_data.pageNameEn ?? path_data.pageNameRu
        : path_data.pageNameRu
      : t('pages.unknown');

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
        {rest[0] === "admin" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='truncate max-w-60'>
                {t('pages.admin')}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {(admin_pages as readonly string[]).includes(rest[1]) ? (
              <BreadcrumbItem>
                <BreadcrumbPage className='truncate max-w-60'>
                  {t(`pages.${rest[1] as typeof admin_pages[number]}`)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className='truncate max-w-60'>
                  {t('pages.unknown')}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </>
        )}
        {isEdit && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className='truncate max-w-60'>
                {t('pages.edit')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
