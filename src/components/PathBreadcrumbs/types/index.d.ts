export interface BreadcrumbsProps {
  itemsBreadcrumbs: PathBreadcrumbs[]
}

export interface PathBreadcrumbs {
  title: string
  path: string
  active: boolean
}
