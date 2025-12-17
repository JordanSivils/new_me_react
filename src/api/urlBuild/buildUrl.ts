type ListQueryParams = {
    page?: number
    limit?: number
    search?: string,
    sortby?: string,
    sortdir?: string
    [key: string]: string | number | boolean | undefined
}

export const buildUrl = (basePath: string, params: ListQueryParams) => {
    const searchParams = new URLSearchParams();

    if (params.page !== undefined) searchParams.set("page", String(params.page));
    if (params.limit !== undefined) searchParams.set("limit", String(params.limit));
    if (params.search && params.search.length >= 2) {
        searchParams.set("search", params.search)
    }

    Object.entries(params).forEach(([key, value]) => {
        if (["page", "limit", "search"].includes(key)) return;
        if (value === undefined) return;
        searchParams.set(key, String(value))
    })

    const queryString = searchParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath
}