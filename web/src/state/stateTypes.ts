export enum CostCategoryType {
	FLEX = "FLEX",
	FIXED = "FIXED",
	ROLLING = "ROLLING"
}

export interface CostCategory {
	id: string
	name: string
	monthlyLimit: number
	type: string
	createdAt?: string
}

export interface FixedCostCategory extends CostCategory {

}

export interface FlexCostCategory extends CostCategory {
	spent?: number
}

export interface RollingCostCategory extends CostCategory {
	totalLimit: number
	spent?: number
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

