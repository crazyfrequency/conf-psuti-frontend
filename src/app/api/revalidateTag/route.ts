import { revalidateTag } from "next/cache"

export async function DELETE(request: Request) {
  const data = await request.json().catch(() => null)
  const tags = data?.tags

  if (!tags || !Array.isArray(tags)) return Response.json({
    success: false,
    error: 'No tags provided'
  },{
    status: 400
  })

  for (const tag of tags) {
    revalidateTag(`${tag}`)
  }
  return Response.json({
    success: true
  })
}