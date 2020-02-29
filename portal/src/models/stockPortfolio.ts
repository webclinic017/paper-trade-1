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
        watchList: Array<number>
    }
    stockposition_set: Array<StockPosition>
}

export const DefaultStockPortfolio = {
    id: -1,
    user: -1,
    principal: '',
    purchasing_power: '',
    properties: {
        watchList: []
    },
    stockposition_set: []
}