module.exports = {
    getTableValues: function (dataBase) {
        const result = Array();

        dataBase.rows.forEach(function (item, index) {
            const values = Object.values(item);
            result.push(values);
        });
        return result;
    },

    getRowIfEqual: function (dataBase, valueName, checkWith) {
        return dataBase.rows.find((value) => {
            return value[valueName] == checkWith;
        });
    },

    removeIfEqual: function (dataBase, valueName, checkWith) {
        let resultIndex = 0;

        const check = dataBase.rows.find((value, index) => {

            if (value[valueName] == checkWith) {
                resultIndex = index;
                return true;
            }

            return false;
        });

        if (check)
            dataBase.rows.splice(resultIndex, 1);

        return check;
    },
}