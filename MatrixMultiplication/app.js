'use strict';

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

function MatrixSubtraction(a, b) {
    
    var n = a[0].length;
    var c = CreateMatrix(n);
    
    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < n; ++j) {
            c[i][j] = a[i][j] - b[i][j];
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

function SquareMatrixMultiply_Strassen(a, b) {
    
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
        
        var s1 = MatrixSubtraction(b12, b22);
        var s2 = MatrixAddition(a11, a12);
        var s3 = MatrixAddition(a21, a22);
        var s4 = MatrixSubtraction(b21, b11);
        var s5 = MatrixAddition(a11, a22);
        var s6 = MatrixAddition(b11, b22);
        var s7 = MatrixSubtraction(a12, a22);
        var s8 = MatrixAddition(b21, b22);
        var s9 = MatrixSubtraction(a11, a21);
        var s10 = MatrixAddition(b11, b12);
        
        var p1 = SquareMatrixMultiply_Strassen(a11, s1);
        var p2 = SquareMatrixMultiply_Strassen(s2, b22);
        var p3 = SquareMatrixMultiply_Strassen(s3, b11);
        var p4 = SquareMatrixMultiply_Strassen(a22, s4);
        var p5 = SquareMatrixMultiply_Strassen(s5, s6);
        var p6 = SquareMatrixMultiply_Strassen(s7, s8);
        var p7 = SquareMatrixMultiply_Strassen(s9, s10);
        
        var c11 = MatrixAddition(MatrixSubtraction(MatrixAddition(p5, p4), p2), p6);
        var c12 = MatrixAddition(p1, p2);
        var c21 = MatrixAddition(p3, p4);
        var c22 = MatrixSubtraction(MatrixSubtraction(MatrixAddition(p5, p1), p3), p7);
        
        SetMatrixData(c11, c, c11[0].length, 0, 0);
        SetMatrixData(c12, c, c11[0].length, n / 2, 0);
        SetMatrixData(c21, c, c11[0].length, 0, n / 2);
        SetMatrixData(c22, c, c11[0].length, n / 2, n / 2);
    }
    
    return c;
}

var i = 0;
var j = 0;
var k = 0;
var sum = 0;
var res = CreateMatrix(3);
function MatrixMultiply_Recursive(a, b) {
    
    // first matrix rows
    if (i < a.length) {
        // second matrix cols
        if (j < b[0].length) {
            // sum for the length of the row of the first matrix
            if (k < a[0].length) {
                sum += a[i][k] * b[k][j];
                k++;
                MatrixMultiply_Recursive(a, b);
            }
            
            if (i < a.length && j < b[0].length) {
                res[i][j] = sum;
            }
            
            j++;
            k = 0;
            sum = 0;
            MatrixMultiply_Recursive(a, b);
        }
        
        i++;
        j = 0;
        k = 0;
        MatrixMultiply_Recursive(a, b);
    }
}

var a = [[1, 2, 3], [4, 5, 6]];
var b = [[7, 8], [9, 10], [11, 12]];

MatrixMultiply_Recursive(a, b);
console.log(res);


//var a = [[1, 2, 3, 4], [5, 6, 7, 8], [-10, -2, -4, -60], [-1, -2, -3, -4]];
//var b = [[1, 2, 3, 4], [5, 6, 7, 8], [-10, -2, -4, -60], [-1, -2, -3, -4]];

//var c = SquareMatrixMultiply(a, b);
//var d = SquareMatrixMultiply_Recursive(a, b);
//var e = SquareMatrixMultiply_Strassen(a, b);

//console.log(c);
//console.log(d);
//console.log(e);

