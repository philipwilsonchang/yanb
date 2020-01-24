export interface FixedCostCategory {
	id: string
	name: string
	amount: number
}

export interface FlexCostCategory {
	id: string
	name: string
	limit: number
	spent?: number
}

export interface RollingCostCategory {
	id: string
	name: string
	monthlyLimit: number
	totalLimit: number
}

export interface MonthlyIncome {
	id: string
	amount: number
}

export interface Cost {
	id: string
	amount: number
	description: string
	createdAt: string
	category: FlexCostCategory
}

export interface FinancialMonth {
	id: string
	month: number
	year: number
	income: number
	totalCost: number
	remainder: number
	closed: boolean
}
