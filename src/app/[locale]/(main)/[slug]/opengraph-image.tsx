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
          width: '1200px',
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
            alt="Vercel"
            src={image}
            style={{ margin: '0 30px' }}
          />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: 'black',
            marginTop: 30,
            padding: '0 120px',
            width: '50%',
            lineHeight: 1.4,
            whiteSpace: 'no-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {"title".repeat(22)}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}