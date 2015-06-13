
function CreateMatrix(rows) {

    var arr = [];
    
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    
    return arr;
}

function SquareMatrixMultiply(a, b) {
    
    var matrixSize = a[0].length;
    var c = CreateMatrix(matrixSize);

    for (var i = 0; i < matrixSize; ++i) {
        for (var j = 0; j < matrixSize; ++j) {
            c[i][j] = 0;
            for (var k = 0; k < matrixSize; ++k) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return c;
}

var a = [[1, -2, 3], [3, -4, 5], [5, -6, 7]];
var b = [[-1, 2, 3], [3, 4, 5], [5, 6, -7]];
var c = SquareMatrixMultiply(a, b);
console.log(c);