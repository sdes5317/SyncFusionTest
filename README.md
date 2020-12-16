# SyncFusionTest
練習使用SyncFusion的模板

# 使用說明
第一次使用因為需要自動產生資料庫及假資料  
請先將Starup裡面的ISqlRepository改為EfCorelRepository  
(其他沒有實作這部分)  
```
services.AddDbContext<MyContext>()
        .AddScoped<ISqlRepository, EfCorelRepository>();
//services.AddScoped<ISqlRepository, DapperRepository>();
//services.AddScoped<ISqlRepository, AdoRepository>();
```
然後佈署網站，打開swagger先呼叫一次GET /Test/InsertOneFakeData  
後續可以改為Dapper的版本運行
```
//services.AddDbContext<MyContext>()
//        .AddScoped<ISqlRepository, EfCorelRepository>();
services.AddScoped<ISqlRepository, DapperRepository>();
//services.AddScoped<ISqlRepository, AdoRepository>();
```

# How To Build
1. 使用VS2019開起
2. 在專案的地方點右鍵，選發佈
