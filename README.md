# react-colorize

React component for generating heat maps. Inspired by [jquery-hottie](https://github.com/DLarsen/jquery-hottie).

### Installing

```
npm install react-colorize
yarn add react-colorize
```

### Usage

```
import Heatmap from 'react-colorize'
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
<Heatmap data={data} />
```

#### Options
* **data**
* minimum - explicitly set a minimum cap on the most negative color
* maximum - explicitly set a maximum cap on the most positive color
* median - explicitly define the neutral value, defaults to mean of values
* readable - invert text color if background color too dark
* theme - object defining theme
* theme.minimum - Most negative color
* theme.maximum - Neutral color
* theme.maximum - Most positive color
* percent - set to true if minimum/maximum are percent values, defaults to false

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
