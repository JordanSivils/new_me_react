export type QueryOptions = {
    page: number
    limit: number
    search?: string
    sortby?: string | undefined
    sortdir?: "asc" | "desc"
    [key: string]: string | number | boolean | undefined;
}