import type { LucideIcon } from 'lucide-react'
import { BookOpen, KeyRound, Map, Monitor, Puzzle, Users } from 'lucide-react'

export interface NavigationItem {
	key: string
	path: string
	icon: LucideIcon
	isContentType: boolean
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{
		key: 'guide',
		path: '/guide',
		icon: BookOpen,
		isContentType: true,
	},
	{
		key: 'levels',
		path: '/levels',
		icon: Map,
		isContentType: true,
	},
	{
		key: 'multiplayer',
		path: '/multiplayer',
		icon: Users,
		isContentType: true,
	},
	{
		key: 'platforms',
		path: '/platforms',
		icon: Monitor,
		isContentType: true,
	},
	{
		key: 'puzzles',
		path: '/puzzles',
		icon: Puzzle,
		isContentType: true,
	},
	{
		key: 'codes',
		path: '/codes',
		icon: KeyRound,
		isContentType: true,
	},
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'build', 'combat', 'guides']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
