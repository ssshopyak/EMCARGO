const findProduct = (array, string) => {
    if (array.length > 0 & string !== null) {
        const filteredArray = array.filter(element => element.ProductName.toLowerCase().includes(string.toLowerCase()))
        return filteredArray
    } else {
        return array
    }
}

export default findProduct