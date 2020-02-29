export interface StockPosition {
    id: number,
    portfolio: number,
    stock: number,
    shares: number,
    purchase_price: String
}

export interface StockPortfolio {
    id: number,
    user: number,
    principal: String,
    purchasing_power: String,
    properties: {
        watch_list: Array<number>
    }
    stockposition_set: Array<StockPosition>
}

export const DefaultStockPortfolio = {
    id: -1,
    user: -1,
    principal: '',
    purchasing_power: '',
    properties: {
        watch_list: []
    },
    stockposition_set: []
}