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
        return dataBase.rows.find((value, index) => {
            if (value[valueName] == checkWith) {
                return dataBase.rows.splice(index, 1);                
            }
        });         
    },
}