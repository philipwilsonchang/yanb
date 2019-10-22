import { FlexCostCategory } from '../prisma-client/index';

export interface SpentFlexCostCategory extends FlexCostCategory {
	spent?: number
}