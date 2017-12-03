# react-colorize

React component for generating heat maps. Inspired by [jquery-hottie](https://github.com/DLarsen/jquery-hottie) & [Chart.HeatMap](https://github.com/tmroyal/Chart.HeatMap).

### Installing

```
npm install react-colorize
yarn add react-colorize
```

### Usage

```
import Heatmap from 'react-colorize'
const data = [
    [8, 6, 5, 7, 9, 8, 1, 6, 3, 3, 8, 7],
    [6, 8, 5, 6, 5, 5, 7, 0, 0, 3, 0, 7],
    [8, 5, 6, 4, 2, 2, 3, 0, 2, 0, 10, 8],
    [4, 0, 7, 4, 6, 3, 2, 4, 2, 10, 8, 2],
    [1, 0, 0, 7, 0, 4, 1, 3, 4, 5, 1, 10],
]
<Heatmap data={data} />
```

#### Options
* **data** - required
* readable - invert text color if background color too dark
* colors - array of colors

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
