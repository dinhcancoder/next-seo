export function buildMenuTree(items) {
  const map = new Map()
  const roots = []

  items.forEach((item) => {
    map.set(item._id, { ...item, children: [] })
  })

  map.forEach((item) => {
    if (item.parent) {
      const parent = map.get(item.parent)
      if (parent) {
        parent.children.push(item)
      } else {
        roots.push(item)
      }
    } else {
      roots.push(item)
    }
  })

  return roots
}

export function flattenMenu(tree, level = 0, result = []) {
  tree.forEach((node) => {
    result.push({
      _id: node._id,
      label: `${'- '.repeat(level)}${node.label}`,
    })

    if (node.children && node.children.length > 0) {
      flattenMenu(node.children, level + 1, result)
    }
  })

  return result
}
