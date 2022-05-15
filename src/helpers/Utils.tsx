export const capitalize = (s: string): string => s && s[0].toUpperCase() + s.slice(1)

export const encodeObjToQuery = (queryData: {[key: string]: string}): string => {
    let query = ""
    for (let d in queryData)
         query += encodeURIComponent(d) + '=' + 
            encodeURIComponent(queryData[d]) + '&'
    return query.slice(0, -1)
}