export interface IConf {
  title: string
  type: string
  description: string
  slug: string
  start: string
  end?: string
  paths: IPath[]
  url: string
}

export interface IPath {
  title: string
  url: string
}