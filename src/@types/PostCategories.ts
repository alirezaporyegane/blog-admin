export type PostCategoryType = {
  _id: string | number
  name: string
  altName: string
  slug: string
  parentId: string | null
  metaTitle: string
  metaDescription: string
  image: string
  sortOrder: number
  active: boolean
  published: Date
}
