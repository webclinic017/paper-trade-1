export interface IStock { 
    id: number,
    name: string,
    symbol: string
}

export interface IDailyStockData {
    id: number,
    symbol: number,
    date: string,
    timezone: string,
    price_data:  {
        [key: string]: { [key: string]: string },
    },
    normalizedData: Array<Array<number>>,
    volumeData: Array<Array<number>>
}

export const DefaultDailyStockData = {
    id: -1,
    symbol: '',
    date: '',
    timezone: '',
    price_data:  {},
    normalizedData: [],
    volumeData: []
}