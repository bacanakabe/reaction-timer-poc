const getPositiveIntFromQueryParam = (queryParams, param) => {
    let numberFromQueryParam = queryParams.has(param) ? queryParams.get(param) : null;
    if (numberFromQueryParam && !isNaN(numberFromQueryParam)) {
        numberFromQueryParam = parseInt(numberFromQueryParam);

        if (numberFromQueryParam < 0) {
            numberFromQueryParam = null;
        } else {
            numberFromQueryParam *= 1000; // convert to milliseconds
        }
    }
    return numberFromQueryParam;
}

export default getPositiveIntFromQueryParam;