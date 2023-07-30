
export function load({ url }) {
    return {
        url: url,
        urlParam: url.searchParams
    }
}