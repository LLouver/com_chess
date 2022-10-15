function de(a){
    for(let i = 1 ; i <= 8 ; ++ i){
        let t='';
        for(let j = 1 ; j <= 8 ; ++ j)
            t += a[i][j] + ' ';
        console.log(t);
    }
}