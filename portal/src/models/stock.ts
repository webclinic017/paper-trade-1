export interface Stock { 
    id: number,
    name: string,
    symbol: string
}

export interface DailyStockData {
    id: number,
    symbol: number,
    date: string,
    timezone: string,
    price_data:  {
        string: string,
    }
}

export const DefaultDailyStockData = {
    id: -1,
    symbol: '',
    date: '',
    timezone: '',
    price_data:  {}
}