export type PostsType = {
  _id?: string
  name: string
  image: string
  header: string
  excerpt: string
  slug: string
  lead: string
  body: string
  metaTitle: string
  metaDescription: string
  active: boolean
  categoryId: string
  category: { value: string; text: string }
  publish: string
  createdAt?: Date
  updatedAt?: Date
}
