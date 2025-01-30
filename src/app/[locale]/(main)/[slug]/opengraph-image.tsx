import { getCurrentLocale } from '@/locales/server'
import { getConfBySlug } from '@/services/confs.server.service'
import { readFile } from 'fs/promises'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { join } from 'path'

export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image({ params: { slug } }: Readonly<{ params: { slug: string } }>) {
  const locale = await getCurrentLocale();
  const response = await getConfBySlug(slug);

  if (response.status !== 'success') return notFound();

  const image = "data:image/png;base64," + (await readFile(join(process.cwd(), 'public', 'logo_pguti_color.png'))).toString('base64');

  const title = locale === 'en' && response.data.isEnglishEnable
    ? response.data.conferenceNameEn ?? response.data.conferenceNameRu
    : response.data.conferenceNameRu

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <img
            alt="ПГУТИ"
            src={image}
            height={200}
          />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: 'black',
            padding: '0 1rem',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      headers: { 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=60' }
    }
  )
}