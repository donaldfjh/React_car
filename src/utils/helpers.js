export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('em-US',{
        style:'currency',
        currency:'USD'
    }).format(number/100)
    
    return newNumber
}

export const getUniqueValues = (data,type) => {
    let unique = data.map((item)=>item[type])
    // new Set - store al collection of unique values of any type
    // all here is to add the 'All' option which will be use later , which mean 'all' is add into new unique array
    if(type === 'colors'){
        unique = unique.flat()
    }
    return ['all',...new Set(unique)]
}
