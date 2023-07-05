export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('em-US',{
        style:'currency',
        currency:'USD'
    }).format(number/100)
    
    return newNumber
}

export const getUniqueValues = () => {}
