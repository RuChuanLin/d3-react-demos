### Line 繪製

SVG 沒有 line 的概念，而是使用 path，而且繪製圖型相當複雜，也無法做動畫。
D3 內建的 line 系列函數可以大幅降低繪製 path 難易度。

### 使用 line 畫線

#### 準備資料

我們需要先有一些資料，這些資料必須包含 x 座標和 y 座標。

```
  const data = [
  {x:10,y:10},
  {x:50,y:100},
  {x:60,y:50},
  {x:100,y:30}
];
```

我們也可以使用一般資料，並指定某些屬性來做為 x/y 座標的值

```
const data = [
        { date: new Date(2018, 0, 20), value: 3 },
        { date: new Date(2018, 0, 21), value: 5 },
        { date: new Date(2018, 0, 22), value: 3.7 },
        { date: new Date(2018, 0, 23), value: 4.5 },
        { date: new Date(2018, 0, 24), value: 3.9 }
      ]
```

#### Scale

在 line 中, 我們經常使用 scale 功能來制定範圍
座標範圍分為兩種:

- domain
- range

##### domain: 座標中的最大/最小數值, 舉個例子

```
const data = [
        { date: new Date(2018, 0, 20), value: 3 },
        { date: new Date(2018, 0, 21), value: 5 },
        { date: new Date(2018, 0, 22), value: 3.7 },
        { date: new Date(2018, 0, 23), value: 4.5 },
        { date: new Date(2018, 0, 24), value: 3.9 }
      ]
```

如果用制定 value 為 y 軸的資料，那麼我們可以設定 y 軸的 domain 為 3~5, 因為最大值為 5, 最小值為 3。

```
  d3
  .scaleLinear()
  .domain([3, 5])
```

我們當然也可以設定其他數值, 如.domain([0, 10]), 此時 y 座標為呈現 0~10 的刻度, 也會使 line 改變

##### range

制定圖形大小, 一般會以 path 標籤的寬高來做設置

```
  d3
  .scaleLinear()
  .range([0, 500])
```

- 使用 rangeRound 函式, 可以四捨五入範圍

##### d3.extent

extent 可以從一組數據的屬性中找出最大及最小值

```
d3.extent(data, (d => d.value))
```


