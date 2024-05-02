export type MenuList = {
   name: string
   icon: string
   to?: string
   show?: boolean
   childs?: Menu[]
}

export type Menu = Pick<MenuList, 'name' | 'icon' | 'to'>;