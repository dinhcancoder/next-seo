import { getMenuTree } from '~/lib/menu'
import HeaderClient from './HeaderClient'

export default async function Header({ logoSrc }) {
  const menu = await getMenuTree()

  const plainMenu = JSON.parse(JSON.stringify(menu))

  return <HeaderClient menu={plainMenu} logoSrc={logoSrc} />
}
