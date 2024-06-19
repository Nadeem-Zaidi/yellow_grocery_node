export interface ProductVariationInput {
    productid: string
    name: string
    description: string
    categoryid: string
    images: string[]
    tags: string
    sku: string
    sellingprice: string | number
    mrp: string | number
    discount: string | number
    quantity: string | number

}

export interface ProductVariationDBInput {
    productid: string
    name: string
    description: string
    categoryid: string
    images: string[]
    tags: string
    sku: string
    sellingprice: number
    mrp: number
    discount: number
    quantity: number
}

export interface MeasuringUnit {
    page?: number | string,
    pagesize?: number | string,
    sortKey?: string,
    sortOrder?: string,
    unit?: string
    description?: string
    abbreviation?: string
}

export interface CategorySpecInput {
    categoryid: string,
    attributename: string,
    measureunit: string
}

export interface CategorySpec {
    page?: number | string
    pagesize?: number | string
    sortKey?: string
    sortOrder?: string
    attributename?: string
    measureunit?: string
}

