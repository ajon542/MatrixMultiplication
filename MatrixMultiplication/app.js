
function CreateMatrix(rows) {

    var arr = [];
    
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    
    return arr;
}

function GetMatrixData(source, size, colOffset, rowOffset) {
    
    var dest = CreateMatrix(size);
    
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            dest[i][j] = source[i + rowOffset][j + colOffset];
        }
    }

    return dest;
}

function SetMatrixData(source, dest, size, colOffset, rowOffset) {
    
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            dest[i + rowOffset][j + colOffset] = source[i][j];
        }
    }
    
    return dest;
}

function MatrixAddition(a, b) {

    var n = a[0].length;
    var c = CreateMatrix(n);
    
    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < n; ++j) {
            c[i][j] = a[i][j] + b[i][j];
        }
    }

    return c;
}

function SquareMatrixMultiply(a, b) {
    
    var n = a[0].length;
    var c = CreateMatrix(n);

    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < n; ++j) {
            c[i][j] = 0;
            for (var k = 0; k < n; ++k) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return c;
}

function SquareMatrixMultiply_Recursive(a, b) {

    var n = a[0].length;
    var c = CreateMatrix(n);

    if (n == 1) {
        c[0][0] = a[0][0] * b[0][0];
    } else {

        var a11 = GetMatrixData(a, n / 2, 0, 0);
        var a12 = GetMatrixData(a, n / 2, n / 2, 0);
        var a21 = GetMatrixData(a, n / 2, 0, n / 2);
        var a22 = GetMatrixData(a, n / 2, n / 2, n / 2);
        
        var b11 = GetMatrixData(b, n / 2, 0, 0);
        var b12 = GetMatrixData(b, n / 2, n / 2, 0);
        var b21 = GetMatrixData(b, n / 2, 0, n / 2);
        var b22 = GetMatrixData(b, n / 2, n / 2, n / 2);

        var c11 = MatrixAddition(SquareMatrixMultiply_Recursive(a11, b11), SquareMatrixMultiply_Recursive(a12, b21));
        var c12 = MatrixAddition(SquareMatrixMultiply_Recursive(a11, b12), SquareMatrixMultiply_Recursive(a12, b22));
        var c21 = MatrixAddition(SquareMatrixMultiply_Recursive(a21, b11), SquareMatrixMultiply_Recursive(a22, b21));
        var c22 = MatrixAddition(SquareMatrixMultiply_Recursive(a21, b12), SquareMatrixMultiply_Recursive(a22, b22));

        SetMatrixData(c11, c, c11[0].length, 0, 0);
        SetMatrixData(c12, c, c11[0].length, n / 2, 0);
        SetMatrixData(c21, c, c11[0].length, 0, n / 2);
        SetMatrixData(c22, c, c11[0].length, n / 2, n / 2);
    }

    return c;
}

var a = [[1, 2, 3, 4], [5, 6, 7, 8], [-10, -2, -4, -60], [-1, -2, -3, -4]];
var b = [[1, 2, 3, 4], [5, 6, 7, 8], [-10, -2, -4, -60], [-1, -2, -3, -4]];
var c = SquareMatrixMultiply(a, b);
var d = SquareMatrixMultiply_Recursive(a, b);

console.log(c);
console.log(d);
